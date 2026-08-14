<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  size?: number;
}>();

const icon = computed(() => {
  return new URL(`../../../assets/icons/${props.name}.svg`, import.meta.url)
    .href;
});
</script>

<template>
  <img :src="icon" :alt="name" :width="size ?? 24" :height="size ?? 24" />
</template>
