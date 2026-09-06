<template>
  <div class="search-bar">
    <div class="mb-8 flex items-center rounded-panel border border-line bg-card">
      <span class="flex items-center pl-4 text-muted">
        <Search :size="18" stroke-width="1.5" />
      </span>
      <input
        v-model="query"
        type="text"
        placeholder="搜索文章..."
        class="w-full border-none bg-transparent px-3 py-3 text-sm outline-none text-ink placeholder:text-muted"
        @input="handleSearch"
      />
      <button
        v-if="query"
        class="flex items-center px-4 py-3 text-sm text-muted hover:bg-soft hover:text-accent"
        @click="clearSearch"
      >
        <X :size="16" stroke-width="1.5" />
      </button>
    </div>

    <div v-if="query && results.length > 0" class="space-y-3">
      <p class="text-xs text-muted">
        找到 {{ results.length }} 篇结果
      </p>
      <a
        v-for="result in results"
        :key="result.slug"
        :href="`/blog/${result.slug}`"
        class="group card-surface block p-4 transition-colors hover:border-accent"
      >
        <h3 class="mb-1 text-base font-semibold tracking-tight text-ink group-hover:text-accent" v-html="highlight(result.title)"></h3>
        <p class="mb-2 text-sm text-muted" v-html="highlight(result.description)"></p>
        <div class="flex items-center gap-2 text-xs text-muted">
          <time :datetime="result.date">{{ formatDate(result.date) }}</time>
          <span v-for="tag in result.tags" :key="tag" class="rounded-inner border border-line px-1.5 py-0.5 text-[10px] text-muted">
            {{ tag }}
          </span>
        </div>
      </a>
    </div>

    <div v-if="query && results.length === 0" class="card-surface p-8 text-center">
      <p class="text-sm text-muted">没有找到相关文章</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Search, X } from '@lucide/vue';
import Fuse from 'fuse.js';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
}

const props = defineProps<{
  posts: BlogPost[] | string;
}>();

const postList = computed<BlogPost[]>(() => {
  if (typeof props.posts === 'string') {
    try {
      return JSON.parse(props.posts);
    } catch {
      return [];
    }
  }
  return props.posts;
});

const query = ref('');
const results = ref<BlogPost[]>([]);

const fuse = new Fuse(postList.value, {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'tags', weight: 1.5 },
  ],
  threshold: 0.4,
  includeScore: true,
});

function handleSearch() {
  if (!query.value.trim()) {
    results.value = [];
    return;
  }
  results.value = fuse.search(query.value).map((r) => r.item);
}

function clearSearch() {
  query.value = '';
  results.value = [];
}

function highlight(text: string): string {
  if (!query.value.trim()) return text;
  const words = query.value.trim().split(/\s+/);
  let result = text;
  for (const word of words) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
  }
  return result;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
</script>

<style scoped>
mark {
  background: var(--accent);
  color: var(--on-accent);
  padding: 0 0.15em;
}
</style>