<script setup lang="ts">
  import { ErrorMessage, Field, Form } from "vee-validate"
  import * as yup from "yup"
  import { useRouter } from "vue-router"

  const expected = [{
    username: "admin",
    password: "123456",
  }]

  const simpleSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(6),
  })

  const router = useRouter()
  function submit(values: { username: string, password: string }) {
    const user = expected.find(
      u => u.username === values.username && u.password === values.password,
    )

    if (user) {
      router.push("/admin/dashboard")
    }
  }
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Login
      </h2>
      <Form :validation-schema="simpleSchema" @submit="submit">
        <div class="mb-6">
          <label for="username" class="block text-sm font-semibold text-gray-800">Username</label>
          <Field
            name="username"
            type="text"
            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <ErrorMessage name="username" class="mt-2 text-red-500 text-xs" />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-semibold text-gray-800">Password</label>
          <Field
            name="password"
            type="password"
            class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <ErrorMessage name="password" class="mt-2 text-red-500 text-xs" />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-lg"
        >
          Login
        </button>
      </Form>
    </div>
  </div>
</template>

<style scoped>
</style>

<route lang="yaml">
  meta:
    path: admin
  </route>
