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
  <div>
    <section v-if="aboutData">
      <div class="bg-[#20a9b5] text-white mb-20">
        <div
          class="container mx-auto text-center h-[350px] flex flex-col items-center justify-center"
        >
          <h1 class="text-7xl font-bold font-handlee">
            {{ aboutData.aboutus }}
          </h1>
          <h2 class="text-2xl mt-4">
            {{ aboutData.aboutlearn }}
          </h2>
        </div>
      </div>
    </section>
    <TheAbout />
    <TheHome />
    <TheTeachers />
  </div>
</template>

<route lang="yaml">
    meta:
      layout: home
    </route>
