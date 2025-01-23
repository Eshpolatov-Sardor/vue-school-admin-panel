<script setup lang="ts">
  import axios from "axios"
  import { onMounted, ref } from "vue"

  const data = ref<any>({})

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/class")
      data.value = response.data[0]
    }
    catch (error) {
      console.error("Error fetching about data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <div v-if="data && Object.keys(data).length > 0">
    <div class="bg-[#20a9b5] text-white">
      <div class="container mx-auto text-center h-96 flex flex-col items-center justify-center">
        <h1 class="text-6xl font-bold font-handlee">
          {{ data.home }}
        </h1>
        <h2 class="text-2xl mt-4">
          {{ data.about }}
        </h2>
      </div>
    </div>
  </div>
  <div><ClassesHome /></div>
  <div><ClassesMain /></div>
</template>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Handlee&display=swap");
</style>
