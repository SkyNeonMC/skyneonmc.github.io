<script setup lang="ts">
const site = useAppConfig() as {
  title: string
  github?: string
  email?: string
  domain?: string
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>🔍 探索</h4>
        <ul>
          <li><NuxtLink to="/links">开往（友链）</NuxtLink></li>
          <li><NuxtLink to="/archive">归档</NuxtLink></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>💬 社交</h4>
        <ul>
          <li v-if="site.github">
            <a :href="site.github" target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li v-if="site.email">
            <a :href="'mailto:' + site.email">Email</a>
          </li>
          <li v-if="site.domain">
            <a :href="'https://' + site.domain" target="_blank" rel="noopener noreferrer">官网</a>
          </li>
          <li>
            <a href="https://space.bilibili.com/3546737941678383" target="_blank" rel="noopener noreferrer">B站</a>
          </li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>📄 信息</h4>
        <ul>
          <li>主题 Clarity</li>
          <li>由 Nuxt 4 强力驱动</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      © {{ currentYear }} {{ site.title }} · All rights reserved.
    </div>
  </footer>
</template>
