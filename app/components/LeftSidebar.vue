<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

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

// === Search modal ===
const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

const openSearch = async () => {
  showSearch.value = true
  await nextTick()
  searchInput.value?.focus()
}
const closeSearch = () => {
  showSearch.value = false
  searchQuery.value = ''
}

const onKeyDown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    openSearch()
  } else if (e.key === 'Escape' && showSearch.value) {
    e.preventDefault()
    closeSearch()
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))

const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  const list = allArticles.value ?? []
  return list.filter((a: any) => {
    const title = (a.title || '').toLowerCase()
    const desc = (a.description || '').toLowerCase()
    const content = (a.content || '').toLowerCase()
    return title.includes(q) || desc.includes(q) || content.includes(q)
  }).slice(0, 10)
})

const highlight = (text: string, q: string) => {
  if (!q) return text
  const lower = text.toLowerCase()
  const idx = lower.indexOf(q.toLowerCase())
  if (idx === -1) return text
  return text.slice(0, idx) + `<mark>${text.slice(idx, idx + q.length)}</mark>` + text.slice(idx + q.length)
}
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

    <div class="sidebar-search" @click="openSearch">
      <span class="sidebar-search-icon">🔍</span>
      <span class="sidebar-search-placeholder">搜索文章...</span>
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

    <!-- Search Modal -->
    <Teleport to="body">
      <Transition name="search-fade">
        <div v-if="showSearch" class="search-overlay" @click.self="closeSearch">
          <div class="search-modal">
            <div class="search-input-wrap">
              <span class="search-modal-icon">🔍</span>
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                class="search-modal-input"
                placeholder="键入开始搜索"
              />
              <button class="search-close-btn" @click="closeSearch" title="关闭 (Esc)">✕</button>
            </div>
            <div class="search-results" v-if="searchQuery">
              <div v-if="searchResults.length === 0" class="search-empty">
                没有找到 "<em>{{ searchQuery }}</em>" 相关的文章
              </div>
              <NuxtLink
                v-for="a in searchResults"
                :key="a.path"
                :to="a.path"
                class="search-result-item"
                @click="closeSearch"
              >
                <div class="search-result-title" v-html="highlight(a.title, searchQuery)"></div>
                <div class="search-result-meta">
                  <span>{{ new Date(a.date).toLocaleDateString('zh-CN') }}</span>
                  <span v-if="a.description" class="search-result-desc">{{ a.description }}</span>
                </div>
              </NuxtLink>
            </div>
            <div v-else class="search-placeholder">
              <span>按 <kbd>Esc</kbd> 关闭</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </aside>
</template>
