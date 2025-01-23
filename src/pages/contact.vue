<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import axios from "axios"
  import { ErrorMessage, Field, Form } from "vee-validate"
  import * as yup from "yup"

  const simpleSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email(),
    subject: yup.string().required("Subject is required"),
    message: yup.string().required("Message is required"),
  })

  function submit() {
  }
  const contactData = ref(null)

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/contact")
      contactData.value = response.data
    }
    catch (error) {
      console.error("Error fetching contact data:", error)
    }
  }

  onMounted(fetchData)
</script>

<template>
  <section v-if="contactData">
    <div class="bg-[#20a9b5] text-white mb-20">
      <div
        class="container mx-auto text-center h-[350px] flex flex-col items-center justify-center"
      >
        <h1 class="text-7xl font-bold font-handlee">
          {{ contactData.contactus }}
        </h1>
        <h2 class="text-2xl mt-4">
          {{ contactData.contactlearn }}
        </h2>
      </div>
    </div>
    <div class="py-12 flex flex-col items-center w-[1150px] mx-auto">
      <h2 class="text-blue-500 uppercase text-xl font-bold mb-2">
        GET IN TOUCH
        <div class="h-0.5 bg-blue-500 w-20 ml-8" />
      </h2>
      <h1 class="text-4xl font-bold text-gray-800 mb-6">
        {{ contactData.heading }}
      </h1>
      <div
        class="px-4 flex flex-col md:flex-row gap-12 items-start"
      >
        <div class="md:w-1/2">
          <Form
            :validation-schema="simpleSchema" class="flex flex-col gap-4 mb-8"
            @submit="submit"
          >
            <Field
              name="name"
              as="input"
              placeholder="Your Name"
              class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              rules="required"
            />
            <ErrorMessage
              name="name"
              class="text-red-500 text-sm mt-1"
            />
            <Field
              name="email"
              as="input"
              type="email"
              placeholder="Your Email"
              class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              rules="required|email"
            />
            <ErrorMessage
              name="email"
              class="text-red-500 text-sm mt-1"
            />
            <Field
              name="subject"
              as="input"
              placeholder="Subject"
              class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              rules="required"
            />
            <ErrorMessage
              name="subject"
              class="text-red-500 text-sm mt-1"
            />
            <Field
              name="message"
              as="textarea"
              rows="5"
              placeholder="Message"
              class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              rules="required"
            />
            <ErrorMessage
              name="message"
              class="text-red-500 text-sm mt-1"
            />

            <button
              type="submit"
              class="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-md transition duration-300"
            >
              {{ contactData.buttonText }}
            </button>
          </Form>
        </div>

        <div class="md:w-1/2">
          <p class="text-gray-600 mb-8">
            {{ contactData.description }}
          </p>
          <div class="mb-4 flex items-start">
            <div class="bg-teal-100 text-teal-900 p-2 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <div>
              <h4 class="font-bold text-gray-700">
                Address
              </h4>
              <p class="text-gray-600">
                {{ contactData.address }}
              </p>
            </div>
          </div>
          <div class="mb-4 flex items-start">
            <div class="bg-teal-100 text-teal-900 p-2 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div>
              <h4 class="font-bold text-gray-700">
                Email
              </h4>
              <p class="text-gray-600">
                {{ contactData.email }}
              </p>
            </div>
          </div>
          <div class="mb-4 flex items-start">
            <div class="bg-teal-100 text-teal-900 p-2 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.72a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </div>
            <div>
              <h4 class="font-bold text-gray-700">
                Phone
              </h4>
              <p class="text-gray-600">
                {{ contactData.phone }}
              </p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="bg-teal-100 text-teal-900 p-2 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <div>
              <h4 class="font-bold text-gray-700">
                Opening Hours
              </h4>
              <p class="text-gray-600">
                {{ contactData.openingHours }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
