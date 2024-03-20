<script setup lang="ts">
    import { availableLocales, loadLanguageAsync } from "@/modules/i18n"

    const { t, locale } = useI18n()

    async function toggleLocales() {
        // change to some real logic
        const locales = availableLocales
        const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
        await loadLanguageAsync(newLocale)
        locale.value = newLocale
    }
</script>

<template>
	<nav class="flex gap-4 mt-6 justify-center text-xl">
		<RouterLink class="icon-btn" to="/" :title="t('button.home')">
			<span class="i-carbon-campsite" />
		</RouterLink>

		<button class="icon-btn" :title="t('button.toggle_dark')" @click="toggleDark()">
			<span class="i-carbon-sun dark:i-carbon-moon" />
		</button>

		<a class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales()">
			<span class="i-carbon-language" />
		</a>

		<RouterLink class="icon-btn" to="/about" :title="t('button.about')" data-test-id="about">
			<span class="i-carbon-dicom-overlay" />
		</RouterLink>

		<a class="icon-btn" rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
			<div class="i-carbon-logo-github" />
		</a>
	</nav>
</template>

<style>
.icon-btn {
	@apply inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600;
}
</style>
