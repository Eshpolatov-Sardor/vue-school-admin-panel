<script setup>
  import { onMounted, ref } from "vue"
  import axios from "axios"
  import BlogDetail from "@/components/BlogDetail.vue"

  const blogData = ref([])

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/blogdetail")
      blogData.value = response.data
    }
    catch (error) {
      console.error("Error fetching blog data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <div>
    <section v-for="(blog, index) in blogData" :key="index">
      <div class="bg-[#20a9b5] text-white">
        <div
          class="container mx-auto text-center h-[350px] flex flex-col items-center justify-center"
        >
          <h1 class="text-7xl font-bold font-handlee">
            {{ blog.title }}
          </h1>
          <h2 class="text-2xl mt-4">
            {{ blog.heading }}
          </h2>
        </div>
      </div>
    </section>
    <BlogDetail />
  </div>
</template>

<route lang="yaml">
  meta:
    layout: home
</route>
