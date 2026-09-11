<template>
  <div class="app" :class="themeClass">
    <LeftSidebar />
    <main class="content-area container">
      <slot />
    </main>
    <RightSidebar />
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
const theme = ref<'dark' | 'light' | 'system'>('dark')
const themeClass = computed(() => theme.value === 'light' ? 'theme-light' : 'theme-dark')

if (import.meta.client) {
  const saved = localStorage.getItem('theme') as 'dark' | 'light' | 'system' | null
  if (saved) {
    theme.value = saved
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    theme.value = 'light'
  }
}

const setTheme = (t: 'dark' | 'light' | 'system') => {
  theme.value = t
  if (import.meta.client) {
    localStorage.setItem('theme', t)
  }
}

provide('theme', theme)
provide('setTheme', setTheme)
</script>
