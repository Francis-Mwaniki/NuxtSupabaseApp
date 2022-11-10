<template>
  <main class="bg-slate-900 p-3 min-h-screen">
    <div
      class="bg-slate-700 rounded-md p-2 mt-10 max-w-sm h-96 flex flex-col gap-y-3 justify-center items-center mx-auto"
    >
      <h3 class="text-gray-300 font-mono">SignIn with Github</h3>
      <button
        class="px-8 py-2 rounded-lg bg-indigo-600 text-gray-300 font-mono"
        @click="signInWithGithub"
      >
        Github
      </button>
    </div>
  </main>
</template>

<script>
export default {
  setup() {
    const fetchedData = ref([]);
    const user = useSupabaseUser();
    const { auth } = useSupabaseClient();
    const signInWithGithub = async () => {
      const { error, data } = await auth.signInWithOAuth({
        provider: "github",
      });
      if (error) throw Error;
      fetchedData.value.push(data);
      console.log(data);
    };
    return { user, auth, signInWithGithub };
  },
};
</script>

<style></style>
