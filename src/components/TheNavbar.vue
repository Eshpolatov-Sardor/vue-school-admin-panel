<script setup>
  import { RouterLink } from "vue-router"
</script>

<template>
  <nav class="bg-white shadow-md py-4">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="flex items-center gap-2 text-blue-600 text-5xl font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 32 32"><g fill="#f22626"><path d="m14.512 19.986l1.014.833a.75.75 0 0 0 .953 0l1.013-.833a.714.714 0 0 0-.453-1.264h-2.074a.713.713 0 0 0-.453 1.264m1.664 2.046a.498.498 0 0 0-.664.357c-.084.337-.196.745-.427 1.073c-.212.302-.526.538-1.085.538c-.654 0-1-.534-1-1a.5.5 0 0 0-1 0c0 .868.654 2 2 2c.925 0 1.528-.43 1.903-.962q.05-.073.097-.148q.045.076.097.148c.375.532.978.962 1.903.962c1.346 0 2-1.132 2-2a.5.5 0 0 0-1 0c0 .466-.346 1-1 1c-.56 0-.873-.236-1.085-.538c-.231-.328-.343-.736-.427-1.073a.5.5 0 0 0-.134-.242a.5.5 0 0 0-.178-.115" /><path d="M16 30.721c-6.2 0-9.494-1.888-9.631-1.968A9.62 9.62 0 0 1 1 20.07q.001-.907.167-1.8a18 18 0 0 1 1.82-5.63a5.5 5.5 0 0 1 8.284-7.14a14.85 14.85 0 0 1 9.459 0a5.5 5.5 0 0 1 8.285 7.149a18.2 18.2 0 0 1 1.826 5.669a9.71 9.71 0 0 1-5.275 10.475l-.003.002c-.141.079-3.43 1.926-9.563 1.926M16 17a8.34 8.34 0 0 0-4.558 1.36A3.2 3.2 0 0 0 10 21.053v.74A6.113 6.113 0 0 0 16 28a6.113 6.113 0 0 0 6-6.207v-.74a3.2 3.2 0 0 0-1.442-2.693A8.34 8.34 0 0 0 16 17m-8.996-6.33a11.9 11.9 0 0 1 2.814-2.11a2.5 2.5 0 1 0-3.656 3.051q.389-.48.842-.942m17.992 0q.454.461.842.942a2.5 2.5 0 1 0-3.656-3.05a11.9 11.9 0 0 1 2.814 2.108M11 14.969v1a1 1 0 0 0 2 0v-1a1 1 0 1 0-2 0m8 0v1a1 1 0 0 0 2 0v-1a1 1 0 1 0-2 0" /></g></svg>
        <span>KidKinder</span>
      </RouterLink>
      <ul class="flex space-x-6 items-center">
        <li>
          <RouterLink to="/about" class="text-black hover:text-gray-500">
            About
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/classes" class="text-black hover:text-gray-500">
            Classes
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/teachers" class="text-black hover:text-gray-500">
            Teachers
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/gallery" class="text-black hover:text-gray-500">
            Gallery
          </RouterLink>
        </li>
        <div class="relative group">
          <li class="text-black hover:text-gray-500 flex items-center">
            <h1>Pages</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 48 48"><path fill="#2196F3" d="M43 17.1L39.9 14L24 29.9L8.1 14L5 17.1L24 36z" /></svg>
          </li>
          <ul class="absolute hidden group-hover:block bg-white shadow-lg rounded py-2 w-32">
            <li>
              <RouterLink to="bloggrid" class="block px-4 py-2 text-black hover:bg-gray-200">
                Blog Grid
              </RouterLink>
            </li>
            <li>
              <RouterLink to="blogdetail" class="block px-4 py-2 text-black hover:bg-gray-200">
                Blog Detail
              </RouterLink>
            </li>
          </ul>
        </div>
        <li>
          <RouterLink to="/contact" class="text-black hover:text-gray-500">
            Contact
          </RouterLink>
        </li>
      </ul>
      <li>
        <RouterLink to="/admin/login" class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
          Join Class
        </RouterLink>
      </li>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-color: #f8fafc;
}
</style>
