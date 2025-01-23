<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import axios from "axios"

  const blogPosts = ref([])
  const currentPage = ref(1)
  const postsPerPage = 6

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/blog")
      blogPosts.value = response.data
    }
    catch (error) {
      console.error("Error fetching blog posts:", error)
    }
  }

  onMounted(fetchData)

  const paginatedPosts = computed(() => {
    const startIndex = (currentPage.value - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return blogPosts.value.slice(startIndex, endIndex)
  })

  const totalPages = computed(() => Math.ceil(blogPosts.value.length / postsPerPage))
</script>

<template>
  <section class="py-12">
    <div class="w-[1200px] mx-auto px-4">
      <h1 class="text-2xl text-center text-blue-400">
        Latest Blog
      </h1>
      <h1 class="text-4xl text-center pb-8 font-bold">
        Latest Articles From Blog
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div v-for="post in paginatedPosts" :key="post.id" class="bg-white rounded-md shadow-md overflow-hidden">
          <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
          <div class="p-6 flex flex-col items-center">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">
              {{ post.title }}
            </h3>
            <div class="flex items-center mb-4 text-gray-600 space-x-4">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user mr-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                {{ post.author }}
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder mr-1"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                {{ post.category }}
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square mr-1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                {{ post.comments }}
              </div>
            </div>
            <p class="text-gray-600 mb-6">
              {{ post.excerpt }}
            </p>
            <button class="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-md transition duration-300">
              Read More
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <div class="flex items-center space-x-2">
          <button
            :disabled="currentPage === 1"
            class="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded-md transition duration-300"
            @click="currentPage = currentPage > 1 ? currentPage - 1 : 1"
          >
            «
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            :class="{ 'bg-teal-500 text-white': currentPage === page, 'text-gray-600 hover:bg-gray-200': currentPage !== page }"
            class="px-3 py-1 rounded-md transition duration-300"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button
            :disabled="currentPage === totalPages"
            class="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded-md transition duration-300"
            @click="currentPage = currentPage < totalPages ? currentPage + 1 : totalPages"
          >
            »
          </button>
        </div>
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
