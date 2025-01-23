<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import axios from "axios"

  const classes = ref([])
  const currentSlide = ref(0)

  const visibleTestimonials = computed(() => {
    const start = currentSlide.value * 3
    return classes.value.slice(start, start + 3)
  })

  const totalSlides = computed(() => Math.ceil(classes.value.length / 3))

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/classes")
      classes.value = response.data
    }
    catch (error) {
      console.error("Error fetching classes :", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <div class="pb-12">
    <div class="text-center py-12">
      <h2 class="text-2xl font-bold text-gray-700 uppercase mb-2">
        Popular Classes
        <div class="h-0.5 bg-blue-500 w-20 mx-auto mb-5" />
      </h2>
      <h1 class="text-4xl font-bold text-gray-800 mb-8">
        Classes for Your Kids
      </h1>
    </div>
    <div class="w-[1100px] mx-auto">
      <div class="flex space-x-8">
        <div
          v-for="(classItem, index) in visibleTestimonials"
          :key="index"
          class="bg-white p-6 rounded-md shadow-md flex-1 relative"
        >
          <img
            :src="classItem.image"
            alt="Class Image"
            class="w-72 h-52 object-cover"
          >

          <div class=" flex flex-col">
            <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">
              {{ classItem.title }}
            </h3>
            <p class="text-gray-600 text-center mb-6">
              {{ classItem.description }}
            </p>
            <div class="border-t border-gray-300 pt-6 flex flex-col gap-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 font-semibold">Age of Kids</span>
                <span class="text-gray-700">{{ classItem.age }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 font-semibold">Total Seats</span>
                <span class="text-gray-700">{{ classItem.seats }} Seats</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 font-semibold">Class Time</span>
                <span class="text-gray-700">{{ classItem.time }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 font-semibold">Tuition Fee</span>
                <span class="text-gray-700">${{ classItem.fee }}/Month</span>
              </div>
            </div>
            <div class="text-center mt-8">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full transition duration-300"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <div class="flex space-x-2">
          <button
            v-for="(dot, index) in totalSlides"
            :key="index"
            class="w-3 h-3 rounded-full"
            :class="{
              'bg-blue-500': currentSlide === index,
              'bg-gray-300': currentSlide !== index,
            }"
            @click="currentSlide = index"
          />
        </div>
      </div>
    </div>
  </div>
</template>
