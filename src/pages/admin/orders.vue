<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const teamData = ref<any[]>([])
  const isLoading = ref(true)
  const error = ref(null)
  const editingId = ref<string | null>(null)
  const tempTeamData = ref<any>(null)
  const isAddingNew = ref(false)
  const newTeamMember = ref({
    name: "",
    teamlearn: "",
    imges: "",
  })

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/team")
      teamData.value = response.data
      isLoading.value = false
    }
    catch (err) {
      error.value = err
      isLoading.value = false
      console.error("Error fetching data:", err)
    }
  }

  function startEditing(id: string) {
    const item = teamData.value.find(item => item.id === id)
    if (item) {
      tempTeamData.value = { ...item }
      editingId.value = id
    }
  }

  async function saveChanges() {
    try {
      const response = await axios.put(
        `http://localhost:3000/team/${editingId.value}`,
        tempTeamData.value,
      )
      const index = teamData.value.findIndex(
        item => item.id === editingId.value,
      )
      if (index !== -1) {
        teamData.value[index] = response.data
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
      await axios.delete(`http://localhost:3000/team/${id}`)
      teamData.value = teamData.value.filter(item => item.id !== id)
    }
    catch (err) {
      console.error("Error deleting item:", err)
    }
  }

  function handleImageChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file && tempTeamData.value) {
      const reader = new FileReader()
      reader.onload = (e) => {
        tempTeamData.value.imges = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  }

  function startAddingNew() {
    isAddingNew.value = true
  }

  function cancelAddingNew() {
    isAddingNew.value = false
    newTeamMember.value = { name: "", teamlearn: "", imges: "" }
  }

  async function addNewTeamMember() {
    try {
      const newMemberWithId = { ...newTeamMember.value, id: uuidv4() }
      const response = await axios.post(
        "http://localhost:3000/team",
        newMemberWithId,
      )
      teamData.value = [...teamData.value, response.data]
      isAddingNew.value = false
      newTeamMember.value = { name: "", teamlearn: "", imges: "" }
    }
    catch (err) {
      console.error("Error adding new team member:", err)
    }
  }

  function handleNewImageChange(e: Event) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        newTeamMember.value.imges = e.target?.result
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
            Add New Member
          </button>
          <div
            v-if="isAddingNew"
            class="mb-6 bg-white rounded-lg shadow-md p-6"
          >
            <div class="space-y-4">
              <input
                v-model="newTeamMember.name"
                placeholder="Team Member Name"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <input
                v-model="newTeamMember.teamlearn"
                placeholder="Team Member Learn"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <label
                for="newTeamImage"
                class="block text-sm font-medium text-gray-700"
              >Team Member Image</label>
              <input
                id="newTeamImage"
                type="file"
                accept="image/*"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                @change="handleNewImageChange"
              >
              <div class="flex mt-4 gap-2">
                <button
                  class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                  @click="addNewTeamMember"
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
            <div v-for="item in teamData" :key="item.id" class="rounded-lg p-6">
              <div v-if="editingId !== item.id" class="w-full">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h2 class="text-2xl font-semibold text-gray-800">
                      {{ item.name }}
                    </h2>
                    <p class="text-gray-600">
                      {{ item.teamlearn }}
                    </p>
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
                  :src="item.imges"
                  alt="Team Member Image"
                  class="rounded-lg shadow-md object-cover w-full h-48 md:h-64"
                >
              </div>
              <div v-else class="space-y-4 bg-white p-4 rounded-lg shadow-md">
                <input
                  v-model="tempTeamData.name"
                  placeholder="Team Member Name"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                >
                <input
                  v-model="tempTeamData.teamlearn"
                  placeholder="Team Member Learn"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                >
                <label
                  for="teamImage"
                  class="block text-sm font-medium text-gray-700"
                >Team Member Image</label>
                <input
                  id="teamImage"
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
      <h1 class="text-5xl py-10 font-bold text-center leading-tight text-gray-900">
        Teachers Footer
      </h1>
      <TeachersFooter />
    </NavbarAdmin>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>
