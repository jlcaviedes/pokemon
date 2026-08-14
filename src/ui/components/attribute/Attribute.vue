<script setup lang="ts">
defineProps<{
  text: String;
  label: String;
  icon: any;
}>();
</script>

<template>
  <div class="attribute">
    <span class="info-label">
      <img :src="icon" alt="label" />
      {{ label }}
    </span>
    <strong class="info-tag"> {{ text }} </strong>
  </div>
</template>
<style scoped>
.attribute {
  display: flex;
  flex-direction: column;
}

.info-tag {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  background: #fff;
  border-radius: 12px;
}

.info-label {
  color: #424242;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.info-tag strong {
  font-size: 15px;

  text-transform: capitalize;
}
</style>
