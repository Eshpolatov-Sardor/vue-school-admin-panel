<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const homeData = ref<any[]>([])
  const isLoading = ref(true)
  const error = ref(null)
  const editing = ref<number | null>(null)
  const tempHomeData = ref<any>(null)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/home")
      homeData.value = response.data
      isLoading.value = false
    }
    catch (err) {
      error.value = err
      isLoading.value = false
    }
  }

  function startEditing(id: number) {
    const item = homeData.value.find(item => item.id === id)
    if (item) {
      tempHomeData.value = { ...item }
      editing.value = id
    }
  }

  async function saveChanges() {
    try {
      const response = await axios.put(
        `http://localhost:3000/home/${editing.value}`,
        tempHomeData.value,
      )
      const index = homeData.value.findIndex(item => item.id === editing.value)
      if (index !== -1) {
        homeData.value[index] = response.data
      }
      editing.value = null
    }
    catch (err) {
      console.error("Error saving changes:", err)
    }
  }

  function cancelChanges() {
    editing.value = null
  }

  onMounted(fetchData)
</script>

<template>
  <div class="bg-gray-100">
    <NavbarAdmin>
      <div class="">
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
          <div
            v-for="item in homeData"
            :key="item.id"
            class="mb-6 bg-white rounded-lg p-6"
          >
            <div
              v-if="editing !== item.id"
              class="bg-white rounded-lg p-6 space-y-6"
            >
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">Kids Learning Center: </span>
                    {{ item.kidshome }}
                  </p>
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">New Home:</span>
                    {{ item.newhome }}
                  </p>
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">Text Home:</span>
                    {{ item.texthome }}
                  </p>
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">Play Ground:</span>
                    {{ item.playGround }}
                  </p>
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">Music and Dance:</span>
                    {{ item.playmusic }}
                  </p>
                </div>
                <div class="space-y-2">
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">Arts and Crafts:</span>
                    {{ item.playarts }}
                  </p>
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">Safe Transportation:</span>
                    {{ item.playsafe }}
                  </p>
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">Healthy Food:</span>
                    {{ item.playhealthy }}
                  </p>
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">Tour:</span>
                    {{ item.playtour }}
                  </p>
                  <p class="text-gray-700 text-sm">
                    <span class="font-semibold text-gray-900">Card Text:</span>
                    {{ item.playlearn }}
                  </p>
                </div>
              </div>

              <div class="flex mt-8 justify-end">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-lg shadow-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  @click="startEditing(item.id)"
                >
                  Edit
                </button>
              </div>
            </div>

            <div v-else>
              <div class="space-y-4">
                <input
                  v-model="tempHomeData.kidshome"
                  placeholder="Kids Home"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                >
                <input
                  v-model="tempHomeData.newhome"
                  placeholder="New Home"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                >
                <textarea
                  v-model="tempHomeData.texthome"
                  placeholder="Text Home"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                />
                <input
                  v-model="tempHomeData.playGround"
                  placeholder="Play Ground"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                >
                <input
                  v-model="tempHomeData.playmusic"
                  placeholder="Music and Dance"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                >
                <input
                  v-model="tempHomeData.playarts"
                  placeholder="Arts and Crafts"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                >
                <input
                  v-model="tempHomeData.playsafe"
                  placeholder="Safe Transportation"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                >
                <input
                  v-model="tempHomeData.playhealthy"
                  placeholder="Healthy food"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                >
                <input
                  v-model="tempHomeData.playtour"
                  placeholder="Healthy food"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                >
                <input
                  v-model="tempHomeData.playlearn"
                  placeholder="Healthy food"
                  class="border border-gray-300 rounded px-4 py-2 w-full"
                >
              </div>
              <div class="flex mt-4 gap-2">
                <button
                  class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
                  @click="saveChanges"
                >
                  Save
                </button>
                <button
                  class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
                  @click="cancelChanges"
                >
                  Cancel
                </button>
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
  max-width: 800px;
}
</style>
