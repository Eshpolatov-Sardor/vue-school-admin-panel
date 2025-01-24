<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const aboutData = ref<any>(null)
  const isLoading = ref(true)
  const error = ref(null)
  const editing = ref(false)
  const tempAboutData = ref<any>(null)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/about")
      aboutData.value = response.data
      isLoading.value = false
    }
    catch (err) {
      error.value = err
      isLoading.value = false
      console.error("Error fetching data:", err)
    }
  }

  function startEditing() {
    if (aboutData.value) {
      tempAboutData.value = { ...aboutData.value }
      editing.value = true
    }
  }

  async function saveChanges() {
    try {
      const response = await axios.put(
        `http://localhost:3000/about`,
        tempAboutData.value,
      )
      aboutData.value = response.data
      editing.value = false
    }
    catch (err) {
      console.error("Error saving changes:", err)
    }
  }

  function cancelChanges() {
    editing.value = false
  }

  async function deleteData() {
    try {
      await axios.delete(`http://localhost:3000/about`)
      aboutData.value = null
    }
    catch (err) {
      console.error("Error deleting item:", err)
    }
  }

  function handleImageChange(e: Event, key: string) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (tempAboutData.value) {
          tempAboutData.value[key] = e.target?.result
        }
      }
      reader.readAsDataURL(file)
    }
  };

  onMounted(fetchData)
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <NavbarAdmin>
      <div class="container mx-auto p-4 md:p-6 lg:p-8">
        <div
          v-if="isLoading"
          class="text-center text-lg font-semibold text-gray-500"
        >
          Loading data...
        </div>
        <div
          v-else-if="error"
          class="text-center text-lg font-semibold text-red-500"
        >
          Error: {{ error }}
        </div>
        <div v-else-if="aboutData" class="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div v-if="!editing">
            <div class="mb-4 flex justify-between items-start">
              <h2 class="text-2xl font-semibold text-gray-800 mb-2">
                {{ aboutData.aboutlearn }}
              </h2>
              <div class="flex gap-2">
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200" @click="startEditing">
                  Edit
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200" @click="deleteData">
                  Delete
                </button>
              </div>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              {{ aboutData.title }}
            </h2>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              {{ aboutData.heading }}
            </h2>
            <p class="text-gray-700 mb-6">
              {{ aboutData.description }}
            </p>
            <ul class="list-disc list-inside text-gray-700 mb-6">
              <li v-for="(feature, index) in aboutData.features" :key="index">
                {{ feature }}
              </li>
            </ul>
            <div class="flex justify-between items-start gap-6 mt-8">
              <img :src="aboutData.mainImage" alt="About Us Main Image" class="rounded-lg shadow-md object-cover w-48 h-48 md:h-64 md:w-64">
              <img :src="aboutData.secondaryImage" alt="About Us Secondary Image" class="rounded-lg shadow-md object-cover w-48 h-48 md:h-64 md:w-64">
            </div>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
              {{ aboutData.buttonText }}
            </button>
          </div>
          <div v-else class="space-y-4">
            <input
              v-model="tempAboutData.aboutus"
              placeholder="About Us"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempAboutData.aboutlearn"
              placeholder="Home / About Us"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempAboutData.title"
              placeholder="Learn About Us"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempAboutData.heading"
              placeholder="Best School For Your Kids"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <textarea
              v-model="tempAboutData.description"
              placeholder="Description"
              rows="10"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            />
            <input
              v-model="tempAboutData.features"
              placeholder="Features"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempAboutData.buttonText"
              placeholder="Button Text"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <label for="mainImage" class="block text-sm font-medium text-gray-700">Main Image</label>
            <input
              id="mainImage"
              type="file"
              accept="image/*"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              @change="(e) => handleImageChange(e, 'mainImage')"
            >
            <label for="secondaryImage" class="block text-sm font-medium text-gray-700">Secondary Image</label>
            <input
              id="secondaryImage"
              type="file"
              accept="image/*"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              @change="(e) => handleImageChange(e, 'secondaryImage')"
            >
            <div class="flex mt-4 gap-2">
              <button class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300" @click="saveChanges">
                Save
              </button>
              <button class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300" @click="cancelChanges">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </NavbarAdmin>
  </div>
</template>
