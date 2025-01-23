<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import axios from "axios"

  const galleryData = ref([])
  const activeFilter = ref("All")
  const selectedImage = ref(null)
  const isModalOpen = ref(false)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/gallery")
      galleryData.value = response.data
    }
    catch (error) {
      console.error("Error fetching gallery data:", error)
    }
  }

  onMounted(fetchData)

  const filteredImages = computed(() => {
    if (activeFilter.value === "All") {
      return galleryData.value
    }
    return galleryData.value.filter(item => item.category === activeFilter.value)
  })

  function openModal(image) {
    selectedImage.value = image
    isModalOpen.value = true
  };

  function closeModal() {
    isModalOpen.value = false
    selectedImage.value = null
  };
</script>

<template>
  <section class="pb-12">
    <TheGallery />
    <div class="w-[1200px] mx-auto px-4">
      <h1 class="text-center text-2xl text-blue-400">
        Our Gallery
      </h1>
      <h1 class="font-bold text-center text-4xl pb-6">
        Our Kids School Gallery
      </h1>
      <div class="flex justify-center space-x-4 mb-8">
        <button
          :class="{ 'bg-teal-500 text-white': activeFilter === 'All', 'text-gray-700 hover:bg-gray-200': activeFilter !== 'All' }"
          class="py-2 px-4 rounded-full transition duration-300"
          @click="activeFilter = 'All'"
        >
          All
        </button>
        <button
          v-for="category in ['Playing', 'Drawing', 'Reading']"
          :key="category"
          :class="{ 'bg-teal-500 text-white': activeFilter === category, 'text-gray-700 hover:bg-gray-200': activeFilter !== category }"
          class="py-2 px-4 rounded-full transition duration-300"
          @click="activeFilter = category"
        >
          {{ category }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="image in filteredImages" :key="image.id" class="rounded-md overflow-hidden cursor-pointer" @click="openModal(image)">
          <img :src="image.src" :alt="image.category" class="w-full h-auto object-cover">
        </div>
      </div>
    </div>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div class="bg-white rounded-md p-4 w-[700px]">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">
            Image Preview
          </h2>
          <button class="text-gray-600 hover:text-gray-800 text-2xl" @click="closeModal">
            ×
          </button>
        </div>
        <img v-if="selectedImage" :src="selectedImage.src" alt="Selected Image" class="w-full h-auto object-cover">
      </div>
    </div>
  </section>
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
