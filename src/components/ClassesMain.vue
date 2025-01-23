<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const bookingData = ref(null)
  const selectedClass = ref("")

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/booking")
      bookingData.value = response.data
    }
    catch (error) {
      console.error("Error fetching booking data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <section v-if="bookingData" class="py-12">
    <div class="w-[1100px] mx-auto flex flex-col md:flex-row items-start gap-12 px-4">
      <div class="md:w-1/2">
        <h2 class="text-blue-500 uppercase text-xl font-bold mb-2">
          {{ bookingData.title }}
          <div class="h-0.5 bg-blue-500 w-20" />
        </h2>
        <h1 class="text-4xl font-bold text-gray-800 mb-6">
          {{ bookingData.heading }}
        </h1>
        <p class="text-gray-600 mb-8">
          {{ bookingData.description }}
        </p>
        <ul class="mb-8">
          <li v-for="(feature, index) in bookingData.features" :key="index" class="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            <span class="text-gray-700">{{ feature }}</span>
          </li>
        </ul>
        <button class="bg-teal-500 hover:bg-teal-600 text-white py-3 px-8 rounded-md transition duration-300">
          {{ bookingData.buttonText }}
        </button>
      </div>

      <div class="md:w-1/2 bg-[#00394F] rounded-md">
        <h3 class="text-2xl font-bold text-white mb-6 pt-8 text-center">
          {{ bookingData.formTitle }}
        </h3>
        <form class="bg-blue-600 w-full rounded-md p-8 flex flex-col gap-1 justify-center items-center">
          <input type="text" placeholder="Your Name" class="bg-white text-white mb-4 rounded-md px-4 py-3 w-full focus:outline-none focus:ring focus:ring-teal-500">
          <input type="email" placeholder="Your Email" class="bg-white text-white mb-4 rounded-md px-4 py-3 w-full focus:outline-none focus:ring focus:ring-teal-500">

          <select v-model="selectedClass" class="bg-white text-black mb-4 rounded-md px-4 py-3 w-full focus:outline-none focus:ring focus:ring-teal-500">
            <option disabled value="">
              Select A Class
            </option>
            <option v-for="(option, index) in bookingData.classes" :key="index" :value="option">
              {{ option }}
            </option>
          </select>
          <button class="bg-[#00394F] hover:bg-teal-900 text-white py-4 px-4 rounded-full transition duration-300 w-52">
            {{ bookingData.formButtonText }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
