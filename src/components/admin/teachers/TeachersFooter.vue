<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const testimonialsData = ref<any[]>([])
  const isLoading = ref(true)
  const error = ref(null)
  const editingId = ref<string | null>(null)
  const tempTestimonialData = ref<any>(null)
  const isAddingNew = ref(false)
  const newTestimonial = ref({
    name: "",
    position: "",
    img: "",
    text: "",
  })

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/testimonials")
      testimonialsData.value = response.data
      isLoading.value = false
    }
    catch (err) {
      error.value = err
      isLoading.value = false
      console.error("Error fetching data:", err)
    }
  }

  function startEditing(id: string) {
    const item = testimonialsData.value.find(item => item.id === id)
    if (item) {
      tempTestimonialData.value = { ...item }
      editingId.value = id
    }
  }

  async function saveChanges() {
    try {
      const response = await axios.put(
        `http://localhost:3000/testimonials/${editingId.value}`,
        tempTestimonialData.value,
      )
      const index = testimonialsData.value.findIndex(item => item.id === editingId.value)
      if (index !== -1) {
        testimonialsData.value[index] = response.data
      }
      editingId.value = null
    }
    catch (err) {
      console.error("Error saving changes:", err)
    }
  }

  function cancelChanges() {
    editingId.value = null
  }

  async function deleteItem(id: string) {
    try {
      await axios.delete(`http://localhost:3000/testimonials/${id}`)
      testimonialsData.value = testimonialsData.value.filter(item => item.id !== id)
    }
    catch (err) {
      console.error("Error deleting item:", err)
    }
  }

  function handleImageChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file && tempTestimonialData.value) {
      const reader = new FileReader()
      reader.onload = (e) => {
        tempTestimonialData.value.img = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  };

  function startAddingNew() {
    isAddingNew.value = true
  }

  function cancelAddingNew() {
    isAddingNew.value = false
    newTestimonial.value = { name: "", position: "", img: "", text: "" }
  }

  async function addNewTestimonial() {
    try {
      const newTestimonialWithId = { ...newTestimonial.value, id: uuidv4() }
      const response = await axios.post("http://localhost:3000/testimonials", newTestimonialWithId)
      testimonialsData.value = [...testimonialsData.value, response.data]
      isAddingNew.value = false
      newTestimonial.value = { name: "", position: "", img: "", text: "" }
    }
    catch (err) {
      console.error("Error adding new testimonial:", err)
    }
  }

  function handleNewImageChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        newTestimonial.value.img = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
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
      <div v-else>
        <button
          v-if="!isAddingNew"
          class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
          @click="startAddingNew"
        >
          Add New Testimonial
        </button>
        <div v-if="isAddingNew" class="mb-6 bg-white rounded-lg shadow-md p-6">
          <div class="space-y-4">
            <input
              v-model="newTestimonial.name"
              placeholder="Name"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="newTestimonial.position"
              placeholder="Position"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <textarea
              v-model="newTestimonial.text"
              placeholder="Text"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            />
            <label for="newTestimonialImage" class="block text-sm font-medium text-gray-700">Testimonial Image</label>
            <input
              id="newTestimonialImage"
              type="file"
              accept="image/*"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              @change="handleNewImageChange"
            >
            <div class="flex mt-4 gap-2">
              <button class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300" @click="addNewTestimonial">
                Add
              </button>
              <button class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300" @click="cancelAddingNew">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in testimonialsData"
            :key="item.id"
            class="rounded-lg shadow-md p-6 transition-shadow hover:shadow-xl"
          >
            <div v-if="editingId !== item.id" class="w-full">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h2 class="text-2xl font-semibold text-gray-800">
                    {{ item.name }}
                  </h2>
                  <p class="text-gray-600 text-sm">
                    {{ item.position }}
                  </p>
                </div>
                <div class="flex gap-2">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200" @click="startEditing(item.id)">
                    Edit
                  </button>
                  <button class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200" @click="deleteItem(item.id)">
                    Delete
                  </button>
                </div>
              </div>
              <img :src="item.img" alt="Testimonial Image" class="rounded-lg shadow-md object-cover w-full h-48 md:h-64 mb-4">
              <p class="text-gray-700">
                {{ item.text }}
              </p>
            </div>
            <div v-else class="space-y-4 bg-white p-4 rounded-lg shadow-md">
              <input
                v-model="tempTestimonialData.name"
                placeholder="Name"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <input
                v-model="tempTestimonialData.position"
                placeholder="Position"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <textarea
                v-model="tempTestimonialData.text"
                placeholder="Text"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <label for="testimonialImage" class="block text-sm font-medium text-gray-700">Testimonial Image</label>
              <input
                id="testimonialImage"
                type="file"
                accept="image/*"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                @change="handleImageChange"
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
      </div>
    </div>
  </div>
</template>

  <style scoped>
  .container {
  max-width: 1400px;
}
</style>
