<script setup lang="ts">
  import axios from "axios"
  import { onMounted, ref } from "vue"
  import BlogGrid from "@/components/BlogGrid.vue"

  const data = ref<any>({})

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/home")
      data.value = response.data[0]
    }
    catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <div v-if="data && Object.keys(data).length > 0">
    <div>
      <div class="bg-[#20a9b5]">
        <div class="flex justify-between items-center container mx-auto">
          <div
            class="relative overflow-hidden text-white text-left font-sans hero-section"
          >
            <h1 class="font-bold text-2xl mb-2">
              {{ data.kidshome }}
            </h1>
            <h2
              class="font-bold w-[650px] text-6xl mb-5 leading-tight font-custom"
            >
              {{ data.newhome }}
            </h2>
            <p class="leading-relaxed w-[650px] text-md">
              {{ data.texthome }}
            </p>
            <button
              class="inline-flex items-center text-white bg-blue-900 border-0 py-4 rounded-full px-12 mt-16 focus:outline-none hover:bg-blue-600"
            >
              Learn More
            </button>
          </div>
          <div>
            <img
              class="w-[700px] h-[800px] pt-12"
              src="/public/img/header.png"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <TheHome />
    <TheAbout />
    <div><ClassesHome /></div>
    <div><ClassesMain /></div>
    <div><TheTeachers /></div>
    <div><TeachersMain /></div>
    <div><BlogGrid /></div>
  </div>
</template>

<style>
.font-bold {
  font-family: "Handlee", cursive;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
