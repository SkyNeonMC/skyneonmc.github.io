<script setup lang="ts">
const route = useRoute()
const tag = route.params.tag as string

const { data: allArticles } = await useAsyncData('all-posts-for-tag', () => {
  return queryCollection('posts').where('draft', '=', false).order('date', 'DESC').all()
})

const articles = computed(() => {
  return (allArticles.value ?? []).filter((a: any) => (a.tags ?? []).includes(tag))
})

function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

useHead({ title: `标签: ${tag}` })
</script>

<template>
  <div>
    <div class="page-header">
      <h1>#{{ tag }}</h1>
      <p>共 {{ articles.length }} 篇相关文章</p>
    </div>
    <ul class="article-list">
      <li v-for="a in articles" :key="a.path" class="article-item">
        <span class="article-date">{{ formatDate(a.date) }}</span>
        <NuxtLink :to="a.path" class="article-title">{{ a.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
