<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const aboutData = ref(null)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/about")
      aboutData.value = response.data
    }
    catch (error) {
      console.error("Error fetching about data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <section v-if="aboutData">
    <div class="w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
      <div class="md:w-1/2 rounded-md overflow-hidden relative">
        <img :src="aboutData.mainImage" alt="About Us Main Image" class="w-full h-auto object-cover">
        <div class="absolute top-4 left-4 bg-white rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
        </div>
      </div>

      <div class="md:w-1/2">
        <h2 class="text-blue-500 uppercase text-xl font-bold mb-2">
          {{ aboutData.title }}
          <div class="h-0.5 bg-blue-500 w-20" />
        </h2>
        <h1 class="text-4xl font-bold text-gray-800 mb-6">
          {{ aboutData.heading }}
        </h1>
        <p class="text-gray-600 mb-8">
          {{ aboutData.description }}
        </p>
        <div class="flex mb-8">
          <div class="mr-8">
            <ul>
              <li v-for="(feature, index) in aboutData.features" :key="index" class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>
          </div>
          <div class="rounded-md overflow-hidden w-32 h-32">
            <img :src="aboutData.secondaryImage" alt="Secondary Image" class="w-full h-full object-cover">
          </div>
        </div>
        <button class="bg-teal-500 hover:bg-teal-600 text-white py-3 px-8 rounded-md transition duration-300">
          {{ aboutData.buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>
