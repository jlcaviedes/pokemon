<script setup lang="ts">
defineProps<{
  type: string;
}>();
</script>

<template>
  <span class="type-tag" :class="`bg-${type}-dark`">
    {{ type }}
  </span>
</template>

<style scoped>
.pokemon-types {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  margin-top: 4px;
}

.type-tag {
  padding: 3px 6px;

  border-radius: 48px;

  font-size: 11px;
  font-weight: 500;

  text-transform: capitalize;
  color: #fff;
  height: 25px;
  min-width: 80px;
}
</style>
