<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const contactData = ref<any>(null)
  const isLoading = ref(true)
  const error = ref(null)
  const editing = ref(false)
  const tempContactData = ref<any>(null)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/contact")
      contactData.value = response.data
      isLoading.value = false
    }
    catch (err) {
      error.value = err
      isLoading.value = false
      console.error("Error fetching data:", err)
    }
  }

  function startEditing() {
    if (contactData.value) {
      tempContactData.value = { ...contactData.value }
      editing.value = true
    }
  }

  async function saveChanges() {
    try {
      const response = await axios.put(
        `http://localhost:3000/contact`,
        tempContactData.value,
      )
      contactData.value = response.data
      editing.value = false
    }
    catch (err) {
      console.error("Error saving changes:", err)
    }
  }

  function cancelChanges() {
    editing.value = false
  }

  onMounted(fetchData)
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <NavbarAdmin>
      <div class="mx-auto p-4 md:p-6 lg:p-8">
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
        <div v-else-if="contactData" class="bg-white rounded-lg shadow-md p-6">
          <div v-if="!editing">
            <div class="flex justify-between items-start mb-4">
              <h2 class="text-2xl font-semibold text-gray-800">
                {{ contactData.contactlearn }}
              </h2>
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200" @click="startEditing">
                Edit
              </button>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              {{ contactData.heading }}
            </h2>
            <p class="text-gray-700 mb-6">
              {{ contactData.description }}
            </p>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
              {{ contactData.buttonText }}
            </button>
            <div class="mt-8 border-t pt-4">
              <p class="text-gray-700 mb-2">
                <strong>Address:</strong> {{ contactData.address }}
              </p>
              <p class="text-gray-700 mb-2">
                <strong>Email:</strong> {{ contactData.email }}
              </p>
              <p class="text-gray-700 mb-2">
                <strong>Phone:</strong> {{ contactData.phone }}
              </p>
              <p class="text-gray-700">
                <strong>Opening Hours:</strong> {{ contactData.openingHours }}
              </p>
            </div>
          </div>
          <div v-else class="space-y-4">
            <input
              v-model="tempContactData.contactus"
              placeholder="Contact Us"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempContactData.contactlearn"
              placeholder="Home/Contact Us"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempContactData.heading"
              placeholder="Contact Us Heading"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <textarea
              v-model="tempContactData.description"
              placeholder="Contact Us Description"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            />
            <input
              v-model="tempContactData.buttonText"
              placeholder="Button Text"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempContactData.address"
              placeholder="Address"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempContactData.email"
              placeholder="Email"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempContactData.phone"
              placeholder="Phone"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempContactData.openingHours"
              placeholder="Opening Hours"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
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

<style scoped>
.container {
  max-width: 1200px;
}
</style>
