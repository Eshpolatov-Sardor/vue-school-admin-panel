<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"

  const blogDetail = ref<any>(null)
  const isLoading = ref(true)
  const error = ref(null)
  const editing = ref(false)
  const tempBlogDetail = ref<any>(null)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/blogdetailhome")
      blogDetail.value = response.data
      isLoading.value = false
    }
    catch (err) {
      error.value = err
      isLoading.value = false
      console.error("Error fetching data:", err)
    }
  }

  function startEditing() {
    if (blogDetail.value) {
      tempBlogDetail.value = { ...blogDetail.value }
      editing.value = true
    }
  }

  async function saveChanges() {
    try {
      const response = await axios.put(
        `http://localhost:3000/blogdetailhome`,
        tempBlogDetail.value,
      )
      blogDetail.value = response.data
      editing.value = false
    }
    catch (err) {
      console.error("Error saving changes:", err)
    }
  }

  function cancelChanges() {
    editing.value = false
  }

  function handleImageChange(e: Event, key: string) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file && tempBlogDetail.value) {
      const reader = new FileReader()
      reader.onload = (e) => {
        tempBlogDetail.value[key] = e.target?.result
      }
      reader.readAsDataURL(file)
    }
  };

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
        <div v-else-if="blogDetail">
          <div v-if="!editing" class="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div class="flex justify-between items-start mb-4">
              <h2 class="text-2xl font-semibold text-gray-800">
                {{ blogDetail.title }}
              </h2>
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200" @click="startEditing">
                Edit
              </button>
            </div>
            <div class="flex items-center space-x-4 mb-6">
              <img :src="blogDetail.mainImage" alt="Main Image" class="rounded-lg shadow-md object-cover w-32 h-32">
              <div class="flex-1">
                <p class="text-gray-600 text-sm">
                  <strong>Author:</strong> {{ blogDetail.author }}
                </p>
                <p class="text-gray-600 text-sm">
                  <strong>Category:</strong> {{ blogDetail.category }}
                </p>
              </div>
            </div>
            <div v-for="(item, index) in blogDetail.content" :key="index" class="mb-4">
              <h2 v-if="item.type === 'heading'" class="text-xl font-semibold text-gray-900">
                {{ item.text }}
              </h2>
              <p v-else-if="item.type === 'paragraph'" class="text-gray-700">
                {{ item.text }}
              </p>
              <img v-else-if="item.type === 'image'" :src="item.src" alt="Content Image" class="rounded-lg shadow-md object-cover w-full h-48 md:h-64">
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              {{ blogDetail.commentsTitle }}
            </h3>
            <div v-for="comment in blogDetail.comments" :key="comment.id" class="bg-gray-50 p-4 rounded-lg mb-4">
              <div class="flex items-start space-x-4 mb-2">
                <img :src="comment.avatar" alt="User Avatar" class="rounded-full w-12 h-12">
                <div>
                  <p class="text-gray-900 font-medium">
                    {{ comment.name }}
                  </p>
                  <p class="text-gray-600 text-sm">
                    {{ comment.date }}
                  </p>
                </div>
              </div>
              <p class="text-gray-700">
                {{ comment.comment }}
              </p>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              {{ blogDetail.commentFormTitle }}
            </h3>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
              {{ blogDetail.commentFormButtonText }}
            </button>
            <div class="mt-8 border-t pt-4">
              <div class="flex items-center space-x-4 mb-6">
                <img :src="blogDetail.authorImage" alt="Author Image" class="rounded-full w-16 h-16">
                <div>
                  <p class="text-gray-900 font-medium">
                    {{ blogDetail.authorName }}
                  </p>
                  <p class="text-gray-700 text-sm">
                    {{ blogDetail.authorDescription }}
                  </p>
                </div>
              </div>
              <div class="flex items-center justify-between mb-6">
                <div class="flex flex-col">
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    Categories
                  </h3>
                  <div class="flex flex-col">
                    <div v-for="category in blogDetail.categories" :key="category.id" class="flex justify-between items-center">
                      <p class="text-gray-700">
                        {{ category.name }}
                      </p>
                      <span class="text-gray-600 text-sm">({{ category.count }})</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    Recent Posts
                  </h3>
                  <div class="flex flex-col">
                    <div v-for="post in blogDetail.recentPosts" :key="post.id" class="mb-2 flex items-center space-x-4">
                      <img :src="post.image" alt="Recent Post Image" class="rounded-lg shadow-md object-cover w-16 h-16">
                      <div>
                        <p class="text-gray-900 font-medium text-sm">
                          {{ post.title }}
                        </p>
                        <p class="text-gray-600 text-xs">
                          {{ post.author }} | {{ post.comments }} Comments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  Tags
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in blogDetail.tags" :key="tag" class="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">{{ tag }}</span>
                </div>
              </div>
              <div class="mt-6 border-t pt-4">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">
                  {{ blogDetail.plainTextTitle }}
                </h3>
                <p class="text-gray-700">
                  {{ blogDetail.plainText }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="space-y-4 bg-white p-4 rounded-lg shadow-md">
            <input
              v-model="tempBlogDetail.title"
              placeholder="Title"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempBlogDetail.author"
              placeholder="Author"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempBlogDetail.category"
              placeholder="Category"
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
            <div v-for="(item, index) in tempBlogDetail.content" :key="index" class="space-y-2">
              <template v-if="item.type === 'heading'">
                <input
                  v-model="item.text"
                  placeholder="Heading Text"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                >
              </template>
              <template v-else-if="item.type === 'paragraph'">
                <textarea
                  v-model="item.text"
                  placeholder="Paragraph Text"
                  rows="10"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </template>
              <template v-else-if="item.type === 'image'">
                <label for="contentImage" class="block text-sm font-medium text-gray-700">Content Image</label>
                <input
                  id="contentImage"
                  type="file"
                  accept="image/*"
                  class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                  @change="(e) => handleImageChange(e, 'src')"
                >
              </template>
            </div>
            <div v-for="(comment, index) in tempBlogDetail.comments" :key="index" class="space-y-2">
              <input
                v-model="comment.name"
                placeholder="Comment Name"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <input
                v-model="comment.date"
                placeholder="Comment Date"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <textarea
                v-model="comment.comment"
                placeholder="Comment Text"
                rows="10"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <label for="commentAvatar" class="block text-sm font-medium text-gray-700">Comment Avatar</label>
              <input
                id="commentAvatar"
                type="file"
                accept="image/*"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                @change="(e) => handleImageChange(e, 'avatar')"
              >
            </div>
            <input
              v-model="tempBlogDetail.commentsTitle"
              placeholder="Comments Title"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempBlogDetail.commentFormTitle"
              placeholder="Comment Form Title"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <input
              v-model="tempBlogDetail.commentFormButtonText"
              placeholder="Comment Form Button Text"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <label for="authorImage" class="block text-sm font-medium text-gray-700">Author Image</label>
            <input
              id="authorImage"
              type="file"
              accept="image/*"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              @change="(e) => handleImageChange(e, 'authorImage')"
            >
            <input
              v-model="tempBlogDetail.authorName"
              placeholder="Author Name"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <textarea
              v-model="tempBlogDetail.authorDescription"
              placeholder="Author Description"
              rows="10"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            />
            <div v-for="(category, index) in tempBlogDetail.categories" :key="index" class="space-y-2">
              <input
                v-model="category.name"
                placeholder="Category Name"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <input
                v-model="category.count"
                placeholder="Category Count"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
            </div>
            <div v-for="(post, index) in tempBlogDetail.recentPosts" :key="index" class="space-y-2">
              <input
                v-model="post.title"
                placeholder="Recent Post Title"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <input
                v-model="post.author"
                placeholder="Recent Post Author"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <input
                v-model="post.comments"
                placeholder="Recent Post Comments"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
              <label for="recentImage" class="block text-sm font-medium text-gray-700">Recent Post Image</label>
              <input
                id="recentImage"
                type="file"
                accept="image/*"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                @change="(e) => handleImageChange(e, 'image')"
              >
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <input
                v-for="(tag, index) in tempBlogDetail.tags"
                :key="index"
                v-model="tempBlogDetail.tags[index]"
                placeholder="Tag"
                class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              >
            </div>
            <input
              v-model="tempBlogDetail.plainTextTitle"
              placeholder="Plain Text Title"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            >
            <textarea
              v-model="tempBlogDetail.plainText"
              placeholder="Plain Text"
              rows="10"
              class="border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
            />
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
