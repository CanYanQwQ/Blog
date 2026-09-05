<template>
  <div ref="artalkRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  server: string;
  path: string;
  site?: string;
  locale?: string;
}>();

const artalkRef = ref<HTMLElement | null>(null);
let loaded = false;

onMounted(() => {
  if (!artalkRef.value || loaded) return;
  loaded = true;

  // 加载 Artalk CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/artalk@2/dist/Artalk.css';
  document.head.appendChild(link);

  // 加载 Artalk JS
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/artalk@2/dist/Artalk.js';
  script.onload = () => {
    const Artalk = (window as any).Artalk;
    if (!Artalk) return;
    Artalk.init({
      el: artalkRef.value,
      server: props.server,
      site: props.site || '博客',
      pageKey: props.path,
      pageTitle: document.title,
      locale: props.locale || 'zh-CN',
    });
  };
  document.body.appendChild(script);
});
</script>