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
  <div class="post-list">
    <article v-for="a in articles" :key="a.path" class="post-card">
      <h2 class="post-title">
        <NuxtLink :to="a.path">{{ a.title }}</NuxtLink>
      </h2>
      <div class="post-meta">发表于 {{ formatDate(a.date) }}</div>
      <p v-if="a.description" class="post-desc">{{ a.description }}</p>
      <NuxtLink :to="a.path" class="post-more">阅读全文 →</NuxtLink>
    </article>
  </div>
</template>
