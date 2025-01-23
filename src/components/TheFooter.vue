<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  interface FooterData {
    brand: {
      logo: string
      name: string
      description: string
      social: { icon: string, link: string }[]
    }
    contact: {
      address: string
      email: string
      phone: string
    }
    links: {
      url: string
      text: string
    }[]
    copyright: {
      text: string
      designer: string
      link: string
    }
  }

  const footerData = ref<FooterData | null>(null)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/footer")
      footerData.value = response.data
    }
    catch (error) {
      console.error("Error fetching footer data:", error)
    }
  }

  onMounted(fetchData)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  };
</script>

<template>
  <footer v-if="footerData" class="bg-[#00394F] text-white pt-12 relative">
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="flex flex-col">
        <div class="flex items-center mb-4">
          <img :src="footerData.brand.logo" alt="Logo" class="h-8 mr-2">
          <h3 class="text-2xl font-bold text-white">
            {{ footerData.brand.name }}
          </h3>
        </div>
        <p class="mb-6 text-gray-300">
          {{ footerData.brand.description }}
        </p>
        <div class="flex space-x-4">
          <a v-for="(social, index) in footerData.brand.social" :key="index" :href="social.link" target="_blank" class="text-teal-200 hover:text-teal-100 transition-colors duration-300">
            <component :is="social.icon" class="w-6 h-6" />
          </a>
        </div>
      </div>

      <div>
        <h4 class="text-xl font-semibold mb-4">
          Get In Touch
        </h4>
        <div class="flex items-start mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>

          <div>
            <h5 class="font-semibold">
              Address
            </h5>
            <p class="text-gray-300">
              {{ footerData.contact.address }}
            </p>
          </div>
        </div>
        <div class="flex items-start mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          <div>
            <h5 class="font-semibold">
              Email
            </h5>
            <p class="text-gray-300">
              {{ footerData.contact.email }}
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.72a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          <div>
            <h5 class="font-semibold">
              Phone
            </h5>
            <p class="text-gray-300">
              {{ footerData.contact.phone }}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 class="text-xl font-semibold mb-4">
          Quick Links
        </h4>
        <ul class="list-none">
          <li v-for="(link, index) in footerData.links" :key="index" class="mb-2">
            <a :href="link.url" class="text-teal-200 hover:text-teal-100 transition-colors duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right mr-1"><polyline points="9 18 15 12 9 6" /></svg>
              {{ link.text }}
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-xl font-semibold mb-4">
          Newsletter
        </h4>
        <form>
          <input type="text" placeholder="Your Name" class="bg-white text-white mb-4 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-teal-500">
          <input type="email" placeholder="Your Email" class="bg-white text-white mb-4 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:ring-teal-500">

          <button class="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-md transition duration-300 w-full">
            Submit Now
          </button>
        </form>
      </div>
    </div>
    <div class="bg-[#00394F] text-center py-4 mt-12 border-t border-gray-700">
      <p class="text-gray-300">
        © {{ footerData.copyright.text }}  . All Rights Reserved. Designed by
        <a :href="footerData.copyright.link" target="_blank" class="text-teal-200 hover:text-teal-100 transition-colors duration-300">{{ footerData.copyright.designer }}</a>
      </p>
    </div>
    <button class="absolute bottom-4 right-4 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full transition duration-300" @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
    </button>
  </footer>
</template>
