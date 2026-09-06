<template>
  <div class="notes-timeline space-y-6">
    <div
      v-for="note in sortedNotes"
      :key="note.slug"
      class="relative card-surface p-5 transition-colors hover:border-accent"
    >
      <!-- Timeline dot -->
      <div class="absolute -left-2.5 top-6 h-4 w-4 rounded-full border border-accent bg-card"></div>

      <time class="block mb-2 text-xs text-muted">
        {{ formatDate(note.date) }}
      </time>

      <div class="prose prose-sm max-w-none" v-html="note.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Note {
  slug: string;
  date: string;
  content: string;
}

const props = defineProps<{
  notes: Note[] | string;
}>();

const noteList = computed<Note[]>(() => {
  if (typeof props.notes === 'string') {
    try {
      return JSON.parse(props.notes);
    } catch {
      return [];
    }
  }
  return props.notes;
});

const sortedNotes = computed(() => {
  return [...noteList.value].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<style scoped>
.notes-timeline {
  position: relative;
}

.notes-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--accent);
}

.notes-timeline > div {
  margin-left: 24px;
}
</style>