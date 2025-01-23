<template>
  <div class="flex flex-col lg:flex-row">
    <nav class="p-6 bg-gradient-to-r from-slate-800 to-slate-500 shadow-lg w-full lg:w-80 min-h-screen">
      <RouterLink to="/admin/dashboard" class="flex items-center space-x-2 mb-6">
        <h1 class="text-4xl font-extrabold text-white tracking-wide">
          Admin Panel
        </h1>
      </RouterLink>
      <ul class="mt-10 space-y-6">
        <li>
          <RouterLink to="/admin/dashboard" class="text-lg font-medium text-white hover:text-gray-300 transition-colors duration-200">
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/information" class="text-lg font-medium text-white hover:text-gray-300 transition-colors duration-200">
            About
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/products" class="text-lg font-medium text-white hover:text-gray-300 transition-colors duration-200">
            Classes
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/orders" class="text-lg font-medium text-white hover:text-gray-300 transition-colors duration-200">
            Teachers
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/gallery" class="text-lg font-medium text-white hover:text-gray-300 transition-colors duration-200">
            Gallery
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/bloggrid" class="text-lg font-medium text-white hover:text-gray-300 transition-colors duration-200">
            Blog Grid
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/blogdetail" class="text-lg font-medium text-white hover:text-gray-300 transition-colors duration-200">
            Blog Detail
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/contact" class="text-lg font-medium text-white hover:text-gray-300 transition-colors duration-200">
            Contact
          </RouterLink>
        </li>
      </ul>
    </nav>

    <main class="flex-1 p-8">
      <div class="flex items-center justify-between mb-6 shadow-lg px-4 py-6 rounded-lg border">
        <div class="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            class="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          >

          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <i class="fas fa-search" />
          </span>
        </div>

        <DarkToggle />
      </div>
      <slot />
    </main>
  </div>
</template>

<style scoped>
nav ul li {
  position: relative;
}

nav ul li::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: #fff;
  transition: width 0.3s;
}

nav ul li:hover::before {
  width: 100%;
}

input[type="text"] {
  background-color: #f0f0f0;
  border: 1px solid #d1d1d1;
}

input[type="text"]:focus {
  border-color: #4f46e5;
}

.dark-toggle {
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #333;
  transition: background-color 0.3s ease;
}

.dark-toggle:hover {
  background-color: #555;
}

main {
  padding: 2rem;
  flex: 1;
}

@media (max-width: 1024px) {
  nav {
    width: 100%;
    position: relative;
    padding: 10px;
  }

  nav ul {
    display: flex;
    flex-direction: column;
  }

  .flex {
    flex-direction: column;
  }

  .lg\\:flex-row {
    flex-direction: column;
  }

  .lg\\:w-80 {
    width: 100%;
  }

  .text-lg {
    font-size: 1rem;
  }
  .search-input {
    width: 80%;
  }
}
</style>
