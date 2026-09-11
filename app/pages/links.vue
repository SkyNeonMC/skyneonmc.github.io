<script setup lang="ts">
const friendLinks: { name: string; url: string; desc?: string }[] = [
  { name: '示例朋友', url: 'https://example.com', desc: '这是一个示例友情链接' }
]
</script>

<template>
  <div>
    <div class="page-header">
      <h1>🔗 友链</h1>
      <p>与世界相连</p>
    </div>
    <div v-if="friendLinks.length" style="display: grid; gap: 0.75rem;">
      <a
        v-for="f in friendLinks"
        :key="f.url"
        :href="f.url"
        target="_blank"
        rel="noopener noreferrer"
        class="article-card"
        style="min-height: auto;"
      >
        <div class="card-cover-bg" style="background: linear-gradient(135deg, #60a5fa, #34d399);"></div>
        <div class="card-info">
          <h2 class="card-title">{{ f.name }}</h2>
          <p v-if="f.desc" class="card-desc">{{ f.desc }}</p>
        </div>
      </a>
    </div>
    <div v-else class="page-header" style="border-bottom: none; text-align: center; padding-top: 2rem;">
      <p style="color: var(--text-muted);">暂无友情链接</p>
    </div>
  </div>
</template>
