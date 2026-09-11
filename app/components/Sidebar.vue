<script setup lang="ts">
const site = useAppConfig() as { title: string }

const { data: allArticles } = await useAsyncData('sidebar-articles', () => {
  return queryCollection('posts').where('draft', '=', false).order('date', 'DESC').all()
})

const tags = computed(() => {
  const set = new Set<string>()
  for (const a of (allArticles.value ?? [])) {
    for (const t of (a.tags ?? [])) set.add(t)
  }
  return Array.from(set)
})

const recent = computed(() => (allArticles.value ?? []).slice(0, 5))

const friendLinks: { name: string; url: string }[] = [
  // 在这里添加你的友情链接
  { name: '示例朋友', url: 'https://example.com' }
]
</script>

<template>
  <aside class="sidebar">
    <div class="widget widget-about">
      <h3 class="widget-title">关于</h3>
      <p>{{ site.title }}<br>Stay hungry, stay foolish.</p>
    </div>
    <div class="widget widget-stats">
      <h3 class="widget-title">站点统计</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-num">{{ allArticles?.length ?? 0 }}</span>
          <span class="stat-label">文章</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">{{ tags.length }}</span>
          <span class="stat-label">标签</span>
        </div>
      </div>
    </div>
    <div class="widget widget-tags">
      <h3 class="widget-title">标签</h3>
      <div class="tag-cloud">
        <NuxtLink v-for="t in tags" :key="t" :to="'/tags/' + t" class="cloud-tag">{{ t }}</NuxtLink>
      </div>
    </div>
    <div class="widget widget-recent">
      <h3 class="widget-title">最近文章</h3>
      <ul class="recent-list">
        <li v-for="a in recent" :key="a.path">
          <NuxtLink :to="a.path">{{ a.title }}</NuxtLink>
          <span class="recent-date">{{ new Date(a.date).toLocaleDateString('zh-CN') }}</span>
        </li>
      </ul>
    </div>
    <div class="widget widget-friends">
      <h3 class="widget-title">友情链接</h3>
      <ul class="friend-list">
        <li v-for="f in friendLinks" :key="f.url">
          <a :href="f.url" target="_blank" rel="noopener noreferrer">{{ f.name }}</a>
        </li>
      </ul>
    </div>
  </aside>
</template>
