<template>
  <main class="relative">
    <div class="absolute top-2 right-3 text-white">
      <button
        @click="logout"
        class="bg-indigo-600 rounded-lg border-none ring-1 ring-white p-2 flex justify-center items-center m-auto flow-row"
      >
        Logout
        <span
          ><svg
            class="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path></svg
        ></span>
      </button>
    </div>
    <main
      class="bg-slate-900 min-h-screen pb-6 flex justify-center flex-col items-center gap-y-11"
    >
      <span class="flex justify-center items-center mx-auto flex-col mt-5" v-show="user">
        <img :src="user.user_metadata.avatar_url" class="h-20 w-20 rounded-full" alt="" />
        <h3 class="text-white">{{ user.email }}</h3>
      </span>
      <h1 class="text-white text-2xl text-center">Supabase todo App</h1>
      <div
        class="bg-slate-800 flex justify-center items-center mx-auto rounded-md flex-col p-10"
      >
        <div class="flex mx-auto justify-center items-center gap-x-2">
          <input
            type="text"
            v-model="addNewTask"
            class="px-5 py-3 bg-yellow-100 rounded-lg text-black"
            placeholder="make something..."
          />
        </div>
        <button
          class="bg-indigo-600 rounded-md text-white font-mono py-2 px-7"
          @click="createData"
        >
          Enter.
        </button>
        <!-- here -->
        <div class="grid md:grid-cols-3 grid-cols-1 mt-10 gap-5">
          <div
            class="card w-full p-5 rounded-md bg-white dark:bg-gray-800"
            v-for="task in newTask"
            :key="task.id"
          >
            <div class="wrapper-button w-full box-border mt-4">
              <div
                class="card max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    class="rounded-t-lg"
                    src="https://flowbite.com/docs/images/blog/image-1.jpg"
                    alt=""
                  />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5
                      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                      {{ task.tasks }}
                    </h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {{ task.completed }}
                  </p>
                  <button
                    class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    update
                    <svg
                      class="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end -->
    </main>
  </main>
</template>

<script>
/* import { ref } from "vue"; */
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  watch: {
    $route() {
      location.reload();
    },
  },
  setup() {
    const router = useRouter();
    const client = useSupabaseClient();
    const user = useSupabaseUser();
    const newTask = ref([]);
    const addNewTask = ref("");
    definePageMeta({
      middleware: "auth",
    });
    const fetchAllData = async () => {
      const { data, error } = await client.from("tasks").select("*");

      if (error) throw Error;
      newTask.value = data;
    };
    const createData = async () => {
      if (newTask.value.length === 0) {
        return;
      }
      const { data, error } = await client.from("tasks").insert({
        id: 8,
        tasks: addNewTask.value,
        completed: false,
      });
      if (error) throw Error;
      else {
        newTask.value.push(data);
        addNewTask.value = "";
        location.reload();
      }
    };
    const logout = async () => {
      await client.auth.signOut();
      router.push("/");
      location.reload;
    };
    console.log(user);

    fetchAllData();
    return { newTask, fetchAllData, user, addNewTask, createData, logout };
  },
};
</script>

<style></style>
