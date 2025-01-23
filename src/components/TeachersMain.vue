 <script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import axios from "axios"

  const testimonials = ref([])
  const currentSlide = ref(0)

  const visibleTestimonials = computed(() => {
    const start = currentSlide.value * 3
    return testimonials.value.slice(start, start + 3)
  })

  const totalSlides = computed(() => Math.ceil(testimonials.value.length / 3))

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/testimonials")
      testimonials.value = response.data
    }
    catch (error) {
      console.error("Error fetching testimonials:", error)
    }
  }

  onMounted(fetchData)
  </script>

<template>
  <div class="pb-12">
    <div class="text-center py-12">
      <h2 class="text-2xl font-bold text-gray-700 uppercase mb-2">
        TESTIMONIAL
        <div class="h-0.5 bg-blue-500 w-20 mx-auto mb-5" />
      </h2>
      <h1 class="text-4xl font-bold text-gray-800 mb-8">
        What Parents Say!
      </h1>
    </div>
    <div class="w-[1100px] mx-auto">
      <div class="flex space-x-8">
        <div
          v-for="(testimonial, index) in visibleTestimonials"
          :key="index"
          class="bg-white p-6 rounded-md shadow-md flex-1 relative"
        >
          <div class="text-gray-600 text-md mb-4">
            <span class="text-blue-500 text-2xl mr-1">"</span>
            {{ testimonial.text }}
          </div>

          <div class="flex items-center mt-4">
            <div class="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img
                :src="testimonial.img"
                alt="Parent Avatar"
                class="w-full h-full object-cover"
              >
            </div>
            <div>
              <h4 class="font-bold text-gray-700">
                {{ testimonial.name }}
              </h4>
              <p class="text-gray-500">
                {{ testimonial.position }}
              </p>
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
            :class="{ 'bg-blue-500': currentSlide === index, 'bg-gray-300': currentSlide !== index }"
            @click="currentSlide = index"
          />
        </div>
      </div>
    </div>
  </div>
</template>
