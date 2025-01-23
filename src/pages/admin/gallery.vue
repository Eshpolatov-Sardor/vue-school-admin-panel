<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"
  import { v4 as uuidv4 } from "uuid"

  const galleryData = ref<any[]>([])
  const isLoading = ref(true)
  const error = ref(null)
  const editingId = ref<string | null>(null)
  const tempGalleryData = ref<any>(null)
  const isAddingNew = ref(false)
  const newGalleryItem = ref({
    src: "",
    category: "",
  })
  const selectedCategory = ref("all")
  const filteredGallery = ref([])

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/gallery")
      galleryData.value = response.data
      filterGallery()
      isLoading.value = false
    }
    catch (err) {
      error.value = err
      isLoading.value = false
      console.error("Error fetching data:", err)
    }
  }

  function startEditing(id: string) {
    const item = galleryData.value.find(item => item.id === id)
    if (item) {
      tempGalleryData.value = { ...item }
      editingId.value = id
    }
  }

  async function saveChanges() {
    try {
      const response = await axios.put(
        `http://localhost:3000/gallery/${editingId.value}`,
        tempGalleryData.value,
      )
      const index = galleryData.value.findIndex(item => item.id === editingId.value)
      if (index !== -1) {
        galleryData.value[index] = response.data
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
      await axios.delete(`http://localhost:3000/gallery/${id}`)
      galleryData.value = galleryData.value.filter(item => item.id !== id)
    }
    catch (err) {
      console.error("Error deleting item:", err)
    }
  }

  function handleImageChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file && tempGalleryData.value) {
      const reader = new FileReader()
      reader.onload = (e) => {
        tempGalleryData.value.src = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  };

  function startAddingNew() {
    isAddingNew.value = true
  }

  function cancelAddingNew() {
    isAddingNew.value = false
    newGalleryItem.value = { src: "", category: "" }
  }

  async function addNewGalleryItem() {
    try {
      const newGalleryItemWithId = { ...newGalleryItem.value, id: uuidv4() }
      const response = await axios.post("http://localhost:3000/gallery", newGalleryItemWithId)
      galleryData.value = [...galleryData.value, response.data]
      filterGallery()
      isAddingNew.value = false
      newGalleryItem.value = { src: "", category: "" }
    }
    catch (err) {
      console.error("Error adding new gallery item:", err)
    }
  }

  function handleNewImageChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        newGalleryItem.value.src = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  }

  function filterGallery() {
    if (selectedCategory.value === "all") {
      filteredGallery.value = [...galleryData.value]
    }
    else {
      filteredGallery.value = galleryData.value.filter(item => item.category === selectedCategory.value)
    }
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
        <div v-else>
          <div class="flex justify-between items-center mb-4">
            <button
              v-if="!isAddingNew"
              class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
              @click="startAddingNew"
            >
              Add New Item
            </button>
            <select v-model="selectedCategory" class="border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none" @change="filterGallery">
              <option value="all">
                All Categories
              </option>
              <option value="Playing">
                Playing
              </option>
              <option value="Drawing">
                Drawing
              </option>
              <option value="Reading">
                Reading
              </option>
            </select>
          </div>
          <div v-if="isAddingNew" class="mb-6 bg-white rounded-lg shadow-md p-6">
            <div class="space-y-4">
              <input
                v-model="newGalleryItem.category"
                placeholder="Category"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <label for="newGalleryImage" class="block text-sm font-medium text-gray-700">Image</label>
              <input
                id="newGalleryImage"
                type="file"
                accept="image/*"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                @change="handleNewImageChange"
              >
              <div class="flex mt-4 gap-2">
                <button class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300" @click="addNewGalleryItem">
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
              v-for="item in filteredGallery"
              :key="item.id"
              class="rounded-lg shadow-md p-6 transition-shadow hover:shadow-xl"
            >
              <div v-if="editingId !== item.id" class="w-full">
                <div class="flex justify-between items-start mb-4">
                  <h2 class="text-2xl font-semibold text-gray-800">
                    {{ item.category }}
                  </h2>
                  <div class="flex gap-2">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200" @click="startEditing(item.id)">
                      Edit
                    </button>
                    <button class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200" @click="deleteItem(item.id)">
                      Delete
                    </button>
                  </div>
                </div>
                <img :src="item.src" alt="Gallery Image" class="rounded-lg shadow-md object-cover w-full h-48 md:h-64">
              </div>
              <div v-else class="space-y-4 bg-white p-4 rounded-lg shadow-md">
                <input
                  v-model="tempGalleryData.category"
                  placeholder="Category"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                >
                <label for="galleryImage" class="block text-sm font-medium text-gray-700">Image</label>
                <input
                  id="galleryImage"
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
    </NavbarAdmin>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>
