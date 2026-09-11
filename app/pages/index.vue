<script setup lang="ts">
const { data: articles } = await useAsyncData('articles', () => {
  return queryCollection('posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
})

function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

useHead({
  title: 'Skyneonmc Blog',
  titleTemplate: '%s · Skyneonmc Blog'
})
</script>

<template>
  <div class="page-header">
    <h1>全部文章</h1>
    <p>共 {{ articles?.length ?? 0 }} 篇</p>
  </div>
  <ul class="article-list">
    <li v-for="a in articles" :key="a.path" class="article-item">
      <span class="article-date">{{ formatDate(a.date) }}</span>
      <NuxtLink :to="a.path" class="article-title">{{ a.title }}</NuxtLink>
      <div v-if="a.tags?.length" class="article-tags">
        <span v-for="t in a.tags" :key="t" class="tag">#{{ t }}</span>
      </div>
    </li>
  </ul>
</template>
