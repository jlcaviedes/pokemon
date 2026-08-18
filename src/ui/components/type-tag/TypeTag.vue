<script setup lang="ts">
import Element from "../element/Element.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps<{
  type: string;
}>();

const iconShow = ["fire", "grass", "poison", "psychic", "ice", "flying"];
</script>

<template>
  <span class="type-tag__element type-tag" :class="`bg-${type}-dark`">
    <Element :name="type" v-if="iconShow.includes(type)" class="type__left" />
    <div>{{ t(type) }}</div>
  </span>
</template>

<style scoped>
.type-tag__element {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  margin-top: 4px;
}

.type-tag {
  padding: 3px 6px;
  border-radius: 48px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  color: #fff;
  height: 25px;
  min-width: 80px;
  display: flex;
  justify-content: stretch;
  column-gap: 8px;
}

.type__left {
  justify-self: left;
}

.type-tag__element div {
  justify-self: center;
  width: 100%;
  font-weight: 700;
}
</style>
