<script setup lang="ts">
  import axios from "axios"
  import { onMounted, ref } from "vue"

  const data = ref<any>({})

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/home")
      data.value = response.data[0]
    }
    catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <div v-if="data && Object.keys(data).length > 0">
    <div class="w-[1100px] mx-auto py-12 mt-12">
      <div class="grid grid-cols-3 gap-12">
        <div class="bg-blue-50 p-6 rounded-md shadow-md flex gap-4">
          <div class="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 32 32"
            >
              <g fill="none" stroke="#000000">
                <path
                  d="M7.3 12.2a.7.7 0 0 1 .7-.7h2.8a.7.7 0 0 1 .7.7v2.6a.7.7 0 0 1-.7.7H8a.7.7 0 0 1-.7-.7zm1 .3v2h2.2v-2zM8 17a.7.7 0 0 0-.7.7v2.6a.7.7 0 0 0 .7.7h2.8a.7.7 0 0 0 .7-.7v-2.6a.7.7 0 0 0-.7-.7zm.3 3v-2h2.2v2zm-1 3.1a.7.7 0 0 1 .7-.7h2.8a.7.7 0 0 1 .7.7v2.6a.7.7 0 0 1-.7.7H8a.7.7 0 0 1-.7-.7zm1 .3v2h2.2v-2zm6.3-11.9a.7.7 0 0 0-.7.7v2.6a.7.7 0 0 0 .7.7h2.8a.7.7 0 0 0 .7-.7v-2.6a.7.7 0 0 0-.7-.7zm.3 3v-2h2.2v2zm-1 3.2a.7.7 0 0 1 .7-.7h2.8a.7.7 0 0 1 .7.7v2.6a.7.7 0 0 1-.7.7h-2.8a.7.7 0 0 1-.7-.7zm1 .3v2h2.2v-2zm-.3 4.4a.7.7 0 0 0-.7.7v2.6a.7.7 0 0 0 .7.7h2.8a.7.7 0 0 0 .7-.7v-2.6a.7.7 0 0 0-.7-.7zm.3 3v-2h2.2v2zm5.6-13.2a.7.7 0 0 1 .7-.7H24a.7.7 0 0 1 .7.7v2.6a.7.7 0 0 1-.7.7h-2.8a.7.7 0 0 1-.7-.7zm1 .3v2h2.2v-2zm-.3 9.9a.7.7 0 0 0-.7.7v2.6a.7.7 0 0 0 .7.7H24a.7.7 0 0 0 .7-.7v-2.6a.7.7 0 0 0-.7-.7zm.3 3v-2h2.2v2zm-.3-8.4a.7.7 0 0 0-.7.7v2.6a.7.7 0 0 0 .7.7H24a.7.7 0 0 0 .7-.7v-2.6a.7.7 0 0 0-.7-.7z"
                />
                <path
                  d="M1.003 7A6.2 6.2 0 0 1 7.2 1h17.6a6.2 6.2 0 0 1 6.197 6H31v17.8a6.2 6.2 0 0 1-6.2 6.2H7.2A6.2 6.2 0 0 1 1 24.8V7zM3 9v15.8A4.2 4.2 0 0 0 7.2 29h17.6a4.2 4.2 0 0 0 4.2-4.2V9z"
                />
              </g>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-700">
              {{ data.playGround }}
            </h3>
            <p class="text-gray-600 text-base">
              {{ data.playlearn }}
            </p>
          </div>
        </div>
        <div class="bg-blue-50 p-6 rounded-md shadow-md flex gap-4">
          <div class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
            >
              <path
                fill="none" stroke="#000000"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 18c0 1.105-1.12 2-2.5 2S4 19.105 4 18s1.12-2 2.5-2s2.5.895 2.5 2zm0 0V7l11-3v11m0 0c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2s1.12-2 2.5-2s2.5.895 2.5 2z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-700">
              {{ data.playmusic }}
            </h3>
            <p class="text-gray-600 text-base">
              {{ data.playlearn }}
            </p>
          </div>
        </div>
        <div class="bg-blue-50 p-6 rounded-md shadow-md flex gap-4">
          <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 48 48"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m13.35 29.92l-8.12 4.7A21.5 21.5 0 0 1 2.5 24.04q0-.51.03-.99l9.38.31c-.02.25-.03.51-.03.77c0 2.1.53 4.07 1.47 5.79m8.84 6.19l-2.07 9.17c-4.07-.74-7.74-2.63-10.66-5.32l6.38-6.87c1.73 1.58 3.92 2.66 6.35 3.02m16.34 3.87a21.5 21.5 0 0 1-11.18 5.39l-1.38-9.28c2.38-.39 4.52-1.48 6.22-3.04zm6.97-15.75c-.01 3.92-1.08 7.59-2.93 10.74l-8.13-4.7c1.06-1.8 1.67-3.89 1.67-6.14c0-.26-.01-.52-.03-.77l9.37-.68c.04.51.05 1.02.05 1.55m-1.43-7.82l-8.74 3.43a12.1 12.1 0 0 0-4.42-5.65l5.3-7.76c3.53 2.44 6.3 5.91 7.86 9.98M30.39 3.59l-2.78 8.98c-1.14-.36-2.35-.55-3.61-.55s-2.47.19-3.61.55L17.61 3.6c2.05-.64 4.23-.98 6.49-.97c2.19.01 4.3.35 6.29.96" /><circle cx="23.997" cy="24.132" r="7" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" /><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M16.4 14.7a12.15 12.15 0 0 0-3.61 4.81l-8.74-3.42c1.48-3.66 3.94-6.82 7.05-9.16z" /><circle cx="23.997" cy="24.132" r="4" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" /><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M8.203 14.493a18.6 18.6 0 0 1 2.34-3.056l1.963 2.878q-.586.686-1.09 1.436z" /></svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-700">
              {{ data.playarts }}
            </h3>
            <p class="text-gray-600 text-base">
              {{ data.playlearn }}
            </p>
          </div>
        </div>
        <div class="bg-blue-50 p-6 rounded-md shadow-md flex gap-4">
          <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 48 48"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m11.803 13.115l2.966-1.615v11.863M11.803 36.5v-10h3.274c1.85 0 3.351 1.504 3.351 3.358s-1.5 3.359-3.351 3.359h-3.274" /><circle cx="32.267" cy="19.433" r="3.93" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" /><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M35.85 12.947c-.655-.858-1.653-1.447-3.307-1.447h-.276a3.93 3.93 0 0 0-3.93 3.93v4.003" /><rect width="6.625" height="10" x="20.905" y="26.5" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" rx="3.313" ry="3.313" /><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M35.1 33.187h-4.431M29.572 36.5l3.313-10l3.312 10M18.093 22.362c.819.687 1.613 1 3.599 1h.341a3.326 3.326 0 0 0 3.326-3.325h0a3.326 3.326 0 0 0-3.326-3.326h-3.94V11.5h7.266M11.803 29.832h3.637m-1.157 1.183v-2.366" /><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M38.5 5.5h-29a4 4 0 0 0-4 4v29a4 4 0 0 0 4 4h29a4 4 0 0 0 4-4v-29a4 4 0 0 0-4-4" /></svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-700">
              {{ data.playsafe }}
            </h3>
            <p class="text-gray-600 text-base">
              {{ data.playlearn }}
            </p>
          </div>
        </div>
        <div class="bg-blue-50 p-6 rounded-md shadow-md flex gap-4">
          <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 48 48"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M39.5 10.35h-31a4 4 0 0 0-4 4v19.3a4 4 0 0 0 4 4h31a4 4 0 0 0 4-4v-19.3a4 4 0 0 0-4-4M9.38 15.57h12.26M9.38 21.24h12.26M9.38 26.92h12.26m0 5.68H9.38m16.98-17.03h12.27m-12.27 5.67h12.27m-12.27 5.68h12.27m0 5.68H26.36" /></svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-700">
              {{ data.playhealthy }}
            </h3>
            <p class="text-gray-600 text-base">
              {{ data.playlearn }}
            </p>
          </div>
        </div>
        <div class="bg-blue-50 p-6 rounded-md shadow-md flex gap-4">
          <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 48 48"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m11.842 5.5l29.375 24.707l-14.712-3.739zm28.593 26.296L6.783 26.615l20.577 9.238zm.171 1.784L19.858 42.5l12.292-.806z" /></svg>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-700">
              {{ data.playtour }}
            </h3>
            <p class="text-gray-600 text-base">
              {{ data.playlearn }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.font-bold {
  font-family: "Handlee", cursive;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
