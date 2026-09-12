<script setup lang="ts">
import { ref, computed } from 'vue'
import { friendLinks } from '~/data/friend-links'

const site = useAppConfig() as {
  title: string
  slogan?: string
  avatar?: string
  email?: string
  github?: string
  domain?: string
  buildPlatform?: string
  imageStorage?: string
  softwareLicense?: string
  articleLicense?: string
}

const { data: articlesDesc } = await useAllPosts()
// DESC 列表反转即可得到 ASC，无需再查一次
const allArticles = computed(() => articlesDesc.value ? [...articlesDesc.value].reverse() : articlesDesc.value)

const firstArticleDate = computed(() => {
  const list = allArticles.value
  if (!list || list.length === 0) return new Date()
  return new Date(list[0].date)
})

const runTime = computed(() => {
  const now = new Date()
  const start = firstArticleDate.value
  const diffMs = now.getTime() - start.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const years = Math.floor(days / 365)
  const remDays = days % 365
  if (years > 0) return `${years}年 ${remDays}天`
  return `${days}天`
})

const lastUpdate = computed(() => {
  const list = allArticles.value
  if (!list || list.length === 0) return '—'
  const d = new Date(list[list.length - 1].date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})

const totalWordCount = computed(() => {
  const list = allArticles.value
  if (!list) return 0
  let total = 0
  for (const a of list) {
    if (typeof a.wordCount === 'number') {
      total += a.wordCount
    }
  }
  return total
})

const formatWordCount = (n: number) => {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`
  return String(n)
}

const showTechDetails = ref(false)
const firstLetter = computed(() => (site.title || 'B').charAt(0).toUpperCase())
</script>

<template>
  <aside class="right-sidebar">
    <div class="widget">
      <h3 class="widget-title">博客统计</h3>
      <div class="stat-cards">
        <div class="stat-card">
          <span class="stat-card-label">运营时长</span>
          <span class="stat-card-value">{{ runTime }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card-label">上次更新</span>
          <span class="stat-card-value">{{ lastUpdate }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-card-label">总字数</span>
          <span class="stat-card-value">{{ formatWordCount(totalWordCount) }}</span>
        </div>
      </div>
    </div>

    <div class="widget">
      <h3 class="widget-title">技术信息</h3>
      <div class="tech-list">
        <div class="tech-row">
          <span class="tech-label">构建平台</span>
          <span class="tech-value">{{ site.buildPlatform || 'GitHub Pages' }}</span>
        </div>
        <div class="tech-row">
          <span class="tech-label">图片存储</span>
          <span class="tech-value">{{ site.imageStorage || 'Local' }}</span>
        </div>
        <div class="tech-row">
          <span class="tech-label">软件协议</span>
          <span class="tech-value">{{ site.softwareLicense || 'MIT' }}</span>
        </div>
        <div class="tech-row">
          <span class="tech-label">文章协议</span>
          <span class="tech-value">{{ site.articleLicense || 'CC BY-NC-SA 4.0' }}</span>
        </div>
        <div class="tech-row">
          <span class="tech-label">域名</span>
          <span class="tech-value">{{ site.domain || 'localhost' }}</span>
        </div>
      </div>
      <button class="tech-expand-btn" @click="showTechDetails = !showTechDetails">
        {{ showTechDetails ? '收起构建详情' : '展开构建详情' }}
      </button>
      <div v-if="showTechDetails" class="tech-details">
        <div class="tech-row"><span class="tech-label">Nuxt</span><span class="tech-value">^4.5.2</span></div>
        <div class="tech-row"><span class="tech-label">Vue</span><span class="tech-value">^3.5.42</span></div>
        <div class="tech-row"><span class="tech-label">Content</span><span class="tech-value">^3.16.0</span></div>
        <div class="tech-row"><span class="tech-label">SQLite</span><span class="tech-value">better-sqlite3</span></div>
        <div class="tech-row"><span class="tech-label">生成时间</span><span class="tech-value">{{ new Date().toLocaleDateString('zh-CN') }}</span></div>
      </div>
    </div>

    <div class="widget contact-widget">
      <h3 class="widget-title">联系</h3>
      <div class="contact-row">
        <div class="contact-avatar">
          <img v-if="site.avatar" :src="site.avatar" :alt="site.title" />
          <span v-else>{{ firstLetter }}</span>
        </div>
        <div class="contact-info">
          <div class="contact-name">{{ site.title }}</div>
          <a v-if="site.email" :href="`mailto:${site.email}`" class="contact-email">{{ site.email }}</a>
          <span v-else class="contact-email">未设置邮箱</span>
        </div>
      </div>
    </div>

    <div class="widget">
      <h3 class="widget-title">友情链接</h3>
      <ul class="friend-list">
        <li v-for="f in friendLinks" :key="f.url">
          <a :href="f.url" target="_blank" rel="noopener noreferrer">
            <span class="friend-avatar" :style="f.avatar ? `background-image: url(${f.avatar})` : ''">
              <span v-if="!f.avatar">{{ f.name.charAt(0).toUpperCase() }}</span>
            </span>
            <span class="friend-name">{{ f.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
