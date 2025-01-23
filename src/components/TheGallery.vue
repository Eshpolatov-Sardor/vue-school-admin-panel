<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const galeriData = ref(null)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/galeri")
      galeriData.value = response.data
    }
    catch (error) {
      console.error("Error fetching about data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <section v-if="galeriData">
    <div class="bg-[#20a9b5] text-white mb-20">
      <div
        class="text-center h-[350px] flex flex-col items-center justify-center"
      >
        <h1 class="text-7xl font-bold font-handlee">
          {{ galeriData.title }}
        </h1>
        <h2 class="text-2xl mt-4">
          {{ galeriData.heading }}
        </h2>
      </div>
    </div>
  </section>
</template>
