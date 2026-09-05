<template>
  <div ref="walineRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { init } from '@waline/client';

const props = defineProps<{
  serverURL: string;
  path: string;
}>();

const walineRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!walineRef.value) return;

  init({
    el: walineRef.value,
    serverURL: props.serverURL,
    path: props.path,
    locale: 'zh-CN',
    reaction: true,
    requiredMeta: ['nick', 'mail'],
    dark: 'html.dark',
    emoji: false,
    imageUploader: false,
    search: false,
    pageSize: 10,
    copyright: false,
  });
});
</script>