<script setup>
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const blogData = ref(null)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/blogdetailhome")
      blogData.value = response.data
    }
    catch (error) {
      console.error("Error fetching blog data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <section v-if="blogData" class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">
            {{ blogData.title }}
          </h1>
        </div>

        <div class="mb-8">
          <img :src="blogData.mainImage" :alt="blogData.title" class="w-full h-[450px] object-cover rounded-md">
        </div>

        <div v-for="(content, index) in blogData.content" :key="index" class="mb-8">
          <h2 v-if="content.type === 'heading'" class="text-3xl font-bold text-gray-800 mb-4">
            {{ content.text }}
          </h2>
          <p v-if="content.type === 'paragraph'" class="text-gray-600 leading-7">
            {{ content.text }}
          </p>
          <div v-if="content.type === 'image'" class="mb-4">
            <img :src="content.src" alt="Blog Content Image" class="w-full [450px] rounded-md">
          </div>
        </div>

        <div class="mt-12 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            Related Post
          </h2>
          <div class="flex space-x-4">
            <div v-for="post in blogData.relatedPosts" :key="post.id" class="bg-white rounded-md shadow-md overflow-hidden">
              <img :src="post.image" :alt="post.title" class="w-full h-32 object-cover">
              <div class="p-2 flex flex-col">
                <h4 class="text-md font-bold text-gray-700 mb-2">
                  {{ post.title }}
                </h4>
                <div class="flex items-center text-gray-600 space-x-2 text-sm">
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user mr-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    {{ post.author }}
                  </span>
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder mr-1"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                    {{ post.category }}
                  </span>
                  <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square mr-1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    {{ post.comments }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div class="mt-12">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            {{ blogData.commentsTitle }}
          </h2>
          <div v-for="comment in blogData.comments" :key="comment.id" class="border-b border-gray-300 mb-6 pb-4">
            <div class="flex items-center mb-4">
              <img :src="comment.avatar" :alt="comment.name" class="w-10 h-10 rounded-full mr-4">
              <div>
                <h4 class="font-bold text-gray-700">
                  {{ comment.name }}
                </h4>
                <p class="text-gray-500 text-sm">
                  {{ comment.date }}
                </p>
              </div>
            </div>
            <p class="text-gray-700 mb-4">
              {{ comment.comment }}
            </p>
            <button class="text-blue-500 hover:text-blue-600 transition duration-300">
              Reply
            </button>
          </div>
        </div>

        <div class="mt-12">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            {{ blogData.commentFormTitle }}
          </h2>
          <form class="flex flex-col gap-4">
            <input type="text" placeholder="Name *" class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500">
            <input type="email" placeholder="Email *" class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500">
            <input type="url" placeholder="Website" class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500">
            <textarea placeholder="Message *" rows="5" class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500" />
            <button class="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-md transition duration-300">
              {{ blogData.commentFormButtonText }}
            </button>
          </form>
        </div>
      </div>

      <div class="md:col-span-1">
        <div class="bg-teal-100 rounded-md p-6 mb-8 flex flex-col items-center">
          <img :src="blogData.authorImage" alt="Author Avatar" class="w-24 h-24 rounded-full mb-4">
          <h4 class="text-xl font-bold text-teal-900 mb-2">
            {{ blogData.authorName }}
          </h4>
          <p class="text-gray-700 text-center">
            {{ blogData.authorDescription }}
          </p>
        </div>

        <div class="mb-8">
          <div class="relative">
            <input type="text" placeholder="Keyword" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4">
            Categories
          </h3>
          <ul class="flex flex-col gap-2">
            <li v-for="category in blogData.categories" :key="category.id" class="flex items-center justify-between text-gray-700 py-1 border-b border-gray-300 last:border-b-0">
              <span>{{ category.name }}</span>
              <span class="bg-gray-200 rounded-full px-2 py-1 text-gray-600">{{ category.count }}</span>
            </li>
          </ul>
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4">
            Recent Post
          </h3>
          <div v-for="post in blogData.recentPosts" :key="post.id" class="flex gap-4 mb-4">
            <img :src="post.image" :alt="post.title" class="w-20 h-20 object-cover rounded-md">
            <div class="flex flex-col">
              <h4 class="font-bold text-gray-800 text-sm">
                {{ post.title }}
              </h4>
              <div class="flex text-gray-600 text-xs space-x-2">
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user mr-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  {{ post.author }}
                </span>
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder mr-1"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                  {{ post.category }}
                </span>
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square mr-1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  {{ post.comments }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-4">
            Tag Cloud
          </h3>
          <div class="flex flex-wrap gap-2">
            <button v-for="tag in blogData.tags" :key="tag" class="bg-gray-200 px-3 py-1 rounded-full text-gray-700 hover:bg-gray-300 transition duration-300">
              {{ tag }}
            </button>
          </div>
        </div>
        <div class="mt-12">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            {{ blogData.plainTextTitle }}
          </h2>
          <p class="text-gray-600">
            {{ blogData.plainText }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
