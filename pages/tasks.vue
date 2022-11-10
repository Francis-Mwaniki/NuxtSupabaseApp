<template>
  <div class="text-white">Data</div>
</template>

<script>
export default {
  setup() {
    const client = useSupabaseClient();
    const user = useSupabaseUser();
    const newTask = ref("");
    const fetchAllData = async () => {
      const { data, error } = await client.from("tasks").select("*");

      console.log(data);
    };

    fetchAllData();
    return { newTask, fetchAllData, user };
  },
};
</script>

<style></style>
