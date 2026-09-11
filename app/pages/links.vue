<script setup lang="ts">
import { friendLinks } from '~/data/friend-links'
</script>

<template>
  <div>
    <div class="page-header">
      <h1>🔗 友链</h1>
      <p>与世界相连</p>
    </div>
    <div v-if="friendLinks.length" class="links-grid">
      <a
        v-for="f in friendLinks"
        :key="f.url"
        :href="f.url"
        target="_blank"
        rel="noopener noreferrer"
        class="friend-card"
      >
        <div class="friend-card-avatar">
          <img v-if="f.avatar" :src="f.avatar" :alt="f.name" />
          <span v-else>{{ f.name.charAt(0).toUpperCase() }}</span>
        </div>
        <div class="friend-card-info">
          <div class="friend-card-name">{{ f.name }}</div>
          <div v-if="f.desc" class="friend-card-desc">{{ f.desc }}</div>
        </div>
      </a>
    </div>
    <div v-else class="page-header" style="border-bottom: none; text-align: center; padding-top: 2rem;">
      <p style="color: var(--text-muted);">暂无友情链接</p>
    </div>
  </div>
</template>

<style scoped>
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.friend-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.friend-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.friend-card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-muted);
  background-size: cover;
  background-position: center;
  overflow: hidden;
  flex-shrink: 0;
}

.friend-card-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.friend-card-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.friend-card-name {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text);
}

.friend-card-desc {
  font-size: 0.75rem;
  color: var(--text-subtle);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
