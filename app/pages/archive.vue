<script setup lang="ts">
const { data: articles } = await useAsyncData('archive', () => {
  return queryCollection('posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
})

const grouped = computed(() => {
  const map = new Map<string, typeof articles.value>()
  for (const a of (articles.value ?? [])) {
    const d = new Date(a.date)
    const key = `${d.getFullYear()}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(a)
  }
  return Array.from(map.entries())
})

function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  return `${date.getMonth() + 1}月${date.getDate()}日`
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1>归档</h1>
    </div>
    <div v-for="[year, list] in grouped" :key="year" style="margin-bottom: 2rem;">
      <h2 style="font-size: 1.1rem; color: var(--accent); margin-bottom: 0.75rem;">{{ year }}</h2>
      <ul class="article-list">
        <li v-for="a in list" :key="a.path" class="article-item">
          <span class="article-date">{{ formatDate(a.date) }}</span>
          <NuxtLink :to="a.path" class="article-title">{{ a.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
