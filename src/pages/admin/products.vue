<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const classesData = ref<any[]>([])
  const isLoading = ref(true)
  const error = ref(null)
  const editingId = ref<string | null>(null)
  const tempClassData = ref<any>(null)
  const isAddingNew = ref(false)
  const newClass = ref({
    image: "",
    title: "",
    description: "",
    age: "",
    seats: "",
    time: "",
    fee: "",
  })

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/classes")
      classesData.value = response.data
      isLoading.value = false
    }
    catch (err) {
      error.value = err
      isLoading.value = false
      console.error("Error fetching data:", err)
    }
  }

  function startEditing(id: string) {
    const item = classesData.value.find(item => item.id === id)
    if (item) {
      tempClassData.value = { ...item }
      editingId.value = id
    }
  }

  async function saveChanges() {
    try {
      const response = await axios.put(
        `http://localhost:3000/classes/${editingId.value}`,
        tempClassData.value,
      )
      const index = classesData.value.findIndex(
        item => item.id === editingId.value,
      )
      if (index !== -1) {
        classesData.value[index] = response.data
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
      await axios.delete(`http://localhost:3000/classes/${id}`)
      classesData.value = classesData.value.filter(item => item.id !== id)
    }
    catch (err) {
      console.error("Error deleting item:", err)
    }
  }

  function handleImageChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file && tempClassData.value) {
      const reader = new FileReader()
      reader.onload = (e) => {
        tempClassData.value.image = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  }

  function startAddingNew() {
    isAddingNew.value = true
  }

  function cancelAddingNew() {
    isAddingNew.value = false
    newClass.value = {
      image: "",
      title: "",
      description: "",
      age: "",
      seats: "",
      time: "",
      fee: "",
    }
  }

  async function addNewClass() {
    try {
      const newClassWithId = { ...newClass.value, id: uuidv4() }
      const response = await axios.post(
        "http://localhost:3000/classes",
        newClassWithId,
      )
      classesData.value = [...classesData.value, response.data]
      isAddingNew.value = false
      newClass.value = {
        image: "",
        title: "",
        description: "",
        age: "",
        seats: "",
        time: "",
        fee: "",
      }
    }
    catch (err) {
      console.error("Error adding new class:", err)
    }
  }

  function handleNewImageChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        newClass.value.image = e.target?.result
      }
      reader.readAsDataURL(file)
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
          <button
            v-if="!isAddingNew"
            class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
            @click="startAddingNew"
          >
            Add New Class
          </button>
          <div
            v-if="isAddingNew"
            class="mb-6 bg-white rounded-lg shadow-md p-6"
          >
            <div class="space-y-4">
              <input
                v-model="newClass.title"
                placeholder="Class Title"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <textarea
                v-model="newClass.description"
                placeholder="Class Description"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <input
                v-model="newClass.age"
                placeholder="Age"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <input
                v-model="newClass.seats"
                placeholder="Seats"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <input
                v-model="newClass.time"
                placeholder="Time"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <input
                v-model="newClass.fee"
                placeholder="Fee"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <label
                for="newClassImage"
                class="block text-sm font-medium text-gray-700"
              >Class Image</label>
              <input
                id="newClassImage"
                type="file"
                accept="image/*"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                @change="handleNewImageChange"
              >
              <div class="flex mt-4 gap-2">
                <button
                  class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                  @click="addNewClass"
                >
                  Add
                </button>
                <button
                  class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  @click="cancelAddingNew"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="item in classesData"
              :key="item.id"
              class="rounded-lg shadow-md p-6 transition-shadow hover:shadow-xl"
            >
              <div v-if="editingId !== item.id" class="w-full">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h2 class="text-2xl font-semibold text-gray-800">
                      {{ item.title }}
                    </h2>
                  </div>
                  <div class="flex gap-2">
                    <button
                      class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                      @click="startEditing(item.id)"
                    >
                      Edit
                    </button>
                    <button
                      class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                      @click="deleteItem(item.id)"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <img
                  :src="item.image"
                  alt="Class Image"
                  class="rounded-lg shadow-md object-cover w-full h-48 md:h-64 mb-4"
                >
                <p class="text-gray-700 mb-2">
                  {{ item.description }}
                </p>
                <div class="flex flex-col md:flex-row justify-between gap-2">
                  <p class="text-gray-700">
                    <strong>Age:</strong> {{ item.age }}
                  </p>
                  <p class="text-gray-700">
                    <strong>Seats:</strong> {{ item.seats }}
                  </p>
                </div>
                <div class="flex flex-col md:flex-row justify-between gap-2">
                  <p class="text-gray-700">
                    <strong>Time:</strong> {{ item.time }}
                  </p>
                  <p class="text-gray-700">
                    <strong>Fee:</strong> {{ item.fee }}
                  </p>
                </div>
              </div>
              <div v-else class="space-y-4 bg-white p-4 rounded-lg shadow-md">
                <input
                  v-model="tempClassData.title"
                  placeholder="Class Title"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                >
                <textarea
                  v-model="tempClassData.description"
                  placeholder="Class Description"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <input
                  v-model="tempClassData.age"
                  placeholder="Age"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                >
                <input
                  v-model="tempClassData.seats"
                  placeholder="Seats"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                >
                <input
                  v-model="tempClassData.time"
                  placeholder="Time"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                >
                <input
                  v-model="tempClassData.fee"
                  placeholder="Fee"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                >
                <label
                  for="classImage"
                  class="block text-sm font-medium text-gray-700"
                >Class Image</label>
                <input
                  id="classImage"
                  type="file"
                  accept="image/*"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                  @change="handleImageChange"
                >
                <div class="flex mt-4 gap-2">
                  <button
                    class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                    @click="saveChanges"
                  >
                    Save
                  </button>
                  <button
                    class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    @click="cancelChanges"
                  >
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
