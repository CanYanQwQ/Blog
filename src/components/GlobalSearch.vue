<template>
  <div class="global-search relative w-full">
    <div class="flex items-center rounded-panel border border-line bg-card">
      <span class="flex items-center pl-3 text-muted">
        <Search :size="16" stroke-width="1.5" />
      </span>
      <input
        v-model="query"
        type="text"
        placeholder="搜索..."
        class="w-full border-none bg-transparent px-2 py-2 text-sm outline-none text-ink placeholder:text-muted"
        @input="handleSearch"
        @focus="showDropdown = true"
        @blur="hideDropdown"
      />
      <button
        v-if="query"
        class="flex items-center px-2 py-2 text-muted hover:text-accent"
        @mousedown.prevent="clearSearch"
      >
        <X :size="14" stroke-width="1.5" />
      </button>
    </div>

    <div
      v-if="showDropdown && query && results.length > 0"
      class="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-panel border border-line bg-card shadow-lg"
    >
      <a
        v-for="(result, i) in results"
        :key="i"
        :href="result.url"
        class="block border-b border-line px-4 py-3 text-sm transition-colors hover:bg-soft last:border-0"
      >
        <div class="flex items-center gap-2">
          <span class="shrink-0 rounded-inner border border-line px-1.5 py-0.5 text-[10px] text-muted">
            {{ result.type }}
          </span>
          <span class="font-medium text-ink">{{ result.title }}</span>
        </div>
        <p class="mt-0.5 line-clamp-1 text-xs text-muted">{{ result.description }}</p>
      </a>
    </div>

    <div
      v-if="showDropdown && query && results.length === 0"
      class="absolute left-0 right-0 top-full z-50 mt-2 rounded-panel border border-line bg-card p-4 text-center text-xs text-muted"
    >
      无结果
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Search, X } from '@lucide/vue';
import Fuse from 'fuse.js';

interface SearchItem {
  title: string;
  description: string;
  url: string;
  type: string;
  keywords?: string;
}

const props = defineProps<{
  items: SearchItem[] | string;
  scope?: string;
}>();

const query = ref('');
const showDropdown = ref(false);

const searchItems = computed<SearchItem[]>(() => {
  if (typeof props.items === 'string') {
    try { return JSON.parse(props.items); }
    catch { return []; }
  }
  return props.items;
});

const fuse = new Fuse(searchItems.value, {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'keywords', weight: 1.5 },
  ],
  threshold: 0.4,
});

const results = computed(() => {
  if (!query.value.trim()) return [];
  return fuse.search(query.value).map(r => r.item);
});

function handleSearch() {
  // reactivity handles it
}

function clearSearch() {
  query.value = '';
}

function hideDropdown() {
  setTimeout(() => { showDropdown.value = false; }, 200);
}
</script>