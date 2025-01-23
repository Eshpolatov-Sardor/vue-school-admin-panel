<script setup lang="ts">
  import axios from "axios"
  import { onMounted, ref } from "vue"

  const data = ref<any>([])

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/team")
      data.value = response.data
    }
    catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <div class="py-20">
    <h1 class="text-5xl py-10 font-bold text-center leading-tight text-gray-900">
      Meet Our Teachers
    </h1>
    <div class="grid grid-cols-4 gap-12 w-[1100px] mx-auto">
      <div
        v-for="(member, index) in data"
        :key="index"
        class="p-6 rounded-md shadow-md flex flex-col items-center relative group"
      >
        <div class="w-40 h-40 rounded-full overflow-hidden mb-4 relative">
          <img
            :src="member.imges"
            alt="Team Member"
            class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
          >
          <div
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/70"
          >
            <div class="flex space-x-4">
              <a
                v-if="member.twitter"
                :href="member.twitter"
                target="_blank"
                class="text-gray-700 hover:text-blue-500 rounded-full p-1 bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-twitter"
                >
                  <path
                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                  />
                </svg>
              </a>
              <a
                v-if="member.facebook"
                :href="member.facebook"
                target="_blank"
                class="text-gray-700 hover:text-blue-500 rounded-full p-1 bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-facebook"
                >
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  />
                </svg>
              </a>
              <a
                v-if="member.linkedin"
                :href="member.linkedin"
                target="_blank"
                class="text-gray-700 hover:text-blue-500 rounded-full p-1 bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-linkedin"
                >
                  <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zm-8 0a3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3zM2 18h4v-7H2v7zM2 22h4V11H2v11z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-700 font-bold text-center">
            {{ member.name }}
          </h3>
          <p class="text-gray-600 text-base text-center">
            {{ member.teamlearn }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.font-bold {
  font-family: "Handlee", cursive;
}
</style>
