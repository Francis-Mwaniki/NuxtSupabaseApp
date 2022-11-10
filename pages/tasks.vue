<template>
  <main class="relative">
    <div class="absolute top-2 right-3 text-white">
      <button @click="logout">Logout</button>
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
        class="bg-slate-800 max-w-md flex justify-center items-center mx-auto rounded-md flex-col p-10"
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
        <div
          class="flex justify-center items-center mx-auto max-w-md flex-col"
          v-for="task in newTask"
          :key="task.id"
        >
          <div class="flex justify-start items-center mx-auto pt-3 gap-3 min-w-max mt-1">
            <div class="text-white px-7">{{ task.tasks }}</div>
            <button class="bg-emerald-700 px-7 rounded-lg border-none text-white">
              {{ task.completed }}
            </button>
          </div>
        </div>
      </div>
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
