<script setup lang="ts">
const { modelValue } = defineModels<{
	modelValue: string
}>()
</script>

<template>
	<input
		id="input"
		v-model="modelValue"
		type="text"
		v-bind="$attrs"
		class="px-4 py-2 w-[250px] text-center bg-transparent rounded border border-gray-200 dark:border-gray-700 outline-none hover:opacity-30"
	>
</template>
