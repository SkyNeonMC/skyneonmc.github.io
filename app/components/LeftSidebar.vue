<script setup lang="ts">
import { computed } from 'vue'

const site = useAppConfig() as {
  title: string
  slogan?: string
  avatar?: string
  email?: string
  github?: string
  domain?: string
}

const theme = inject<Ref<'dark' | 'light' | 'system'>>('theme')!
const setTheme = inject<(t: 'dark' | 'light' | 'system') => void>('setTheme')!

const route = useRoute()

const { data: allArticles } = await useAsyncData('sidebar-count', () => {
  return queryCollection('posts').where('draft', '=', false).order('date', 'DESC').all()
})

const postCount = computed(() => allArticles.value?.length ?? 0)
const firstLetter = computed(() => (site.title || 'B').charAt(0).toUpperCase())

const navItems = computed(() => [
  { key: 'posts', icon: '📄', label: '文章', to: '/', count: postCount.value },
  { key: 'links', icon: '🔗', label: '友链', to: '/links', count: undefined },
  { key: 'archive', icon: '📁', label: '归档', to: '/archive', count: undefined },
])

const activeKey = computed(() => {
  if (route.path === '/' || route.path.startsWith('/posts')) return 'posts'
  if (route.path.startsWith('/links')) return 'links'
  if (route.path.startsWith('/archive')) return 'archive'
  return ''
})

const socialLinks = computed(() => {
  const items: { icon: string; href: string; label: string }[] = []
  if (site.github) items.push({ icon: '🐙', href: site.github, label: 'GitHub' })
  if (site.email) items.push({ icon: '✉️', href: `mailto:${site.email}`, label: 'Email' })
  if (site.domain) items.push({ icon: '🌐', href: `https://${site.domain}`, label: 'Website' })
  items.push({ icon: '📡', href: '/feed.xml', label: 'RSS' })
  return items
})
</script>

<template>
  <aside class="left-sidebar">
    <div class="sidebar-profile">
      <div class="sidebar-avatar">
        <img v-if="site.avatar" :src="site.avatar" :alt="site.title" />
        <span v-else>{{ firstLetter }}</span>
      </div>
      <div>
        <div class="sidebar-name">{{ site.title }}</div>
        <div class="sidebar-slogan">{{ site.slogan || 'Stay hungry, stay foolish.' }}</div>
      </div>
    </div>

    <div class="sidebar-search">
      <input type="text" placeholder="搜索文章..." readonly />
      <span class="sidebar-search-hint">Ctrl+K</span>
    </div>

    <nav class="sidebar-nav">
      <NuxtLink
        v-for="item in navItems"
        :key="item.key"
        :to="item.to"
        class="nav-btn"
        :class="{ active: activeKey === item.key }"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
        <span v-if="item.count !== undefined" class="nav-pill">{{ item.count }}</span>
      </NuxtLink>
    </nav>

    <div class="sidebar-bottom">
      <div class="theme-toggle">
        <button
          class="theme-btn"
          :class="{ active: theme === 'dark' }"
          @click="setTheme('dark')"
          title="深色"
        >🌙</button>
        <button
          class="theme-btn"
          :class="{ active: theme === 'system' }"
          @click="setTheme('system')"
          title="跟随系统"
        >🖥️</button>
        <button
          class="theme-btn"
          :class="{ active: theme === 'light' }"
          @click="setTheme('light')"
          title="浅色"
        >☀️</button>
      </div>
      <div class="sidebar-social">
        <a
          v-for="s in socialLinks"
          :key="s.label"
          :href="s.href"
          :title="s.label"
          class="social-icon"
          target="_blank"
          rel="noopener noreferrer"
        >{{ s.icon }}</a>
      </div>
    </div>
  </aside>
</template>
