<script setup lang="ts">
import spriteFish from "../../../assets/images/fish.png";

defineProps({
  title: String,
  description: String,
  isRetry: Boolean,
});

const emit = defineEmits();
const onPress = () => {
  emit("retry");
};
</script>

<template>
  <main class="empty">
    <section class="container">
      <div class="empty__step-1">
        <img class="illustration empty__img-2" :src="spriteFish" alt="fish" />
      </div>

      <h1>{{ title }}</h1>
      <p>
        {{ description }}
      </p>
    </section>

    <button v-if="isRetry" @click="onPress">Reitentar</button>
  </main>
</template>

<style scoped>
.empty {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 24px;
}

.empty__step-1 {
  max-height: 265px;
  height: 265px;
  max-width: 342px;
  position: relative;
}

.empty__img-1 {
  position: absolute;
  left: 102px;
}

.empty__img-2 {
  position: absolute;
  left: 10px;
}

.container {
  width: 100%;
  text-align: center;
  width: 342px;
}

.illustration {
  filter: grayscale(100%);
  opacity: 0.5;
  margin-bottom: 32px;
  width: 251px;
  height: 258.59px;
}

h1 {
  margin-bottom: 16px;
  font-size: 26px;
  font-weight: 500;
}

p {
  line-height: 1.6;
  margin-bottom: 32px;
  font-size: 14px;
}

.indicators {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
}

.indicators span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ccc;
}

.indicators span.active {
  width: 28px;
  background: #4565b7;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
}
</style>
