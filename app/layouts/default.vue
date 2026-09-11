<template>
  <div class="app">
    <header class="navbar">
      <div class="container navbar-inner">
        <NuxtLink to="/" class="navbar-brand">{{ site.title }}</NuxtLink>
        <nav class="navbar-links">
          <NuxtLink to="/" class="navbar-link">首页</NuxtLink>
          <NuxtLink to="/archive" class="navbar-link">归档</NuxtLink>
          <NuxtLink to="/about" class="navbar-link">关于</NuxtLink>
        </nav>
      </div>
    </header>
    <div class="container main-wrapper">
      <main class="content-area">
        <slot />
      </main>
      <Sidebar />
    </div>
    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} {{ site.title }} · Built with Nuxt · Theme Clarity</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const site = useAppConfig() as { title: string }
</script>
