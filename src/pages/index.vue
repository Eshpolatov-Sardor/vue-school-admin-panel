<script setup lang="ts">
defineOptions({
	name: "IndexPage",
})
const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
function go() {
	if (name)
		router.push(`/hi/${encodeURIComponent(name)}`)
}

const { t } = useI18n()
</script>

<template>
	<div>
		<p>
			<a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
				Vitesse
			</a>
		</p>
		<p>
			<em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
		</p>

		<div class="py-4" />

		<TheInput
			v-model="name"
			placeholder="What's your name?"
			autocomplete="false"
			@keydown.enter="go"
		/>
		<label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

		<div>
			<button
				class="m-3 text-sm btn"
				:disabled="!name"
				@click="go"
			>
				{{ t('button.go') }}
			</button>
		</div>
	</div>
</template>

<style>
.btn {
	@apply px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
