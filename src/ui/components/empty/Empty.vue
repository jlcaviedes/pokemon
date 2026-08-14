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
    <section class="empty__container">
      <div class="empty__block">
        <img
          class="empty__illustration empty__img"
          :src="spriteFish"
          alt="fish"
        />
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

.empty__block {
  max-height: 265px;
  height: 265px;
  max-width: 342px;
  position: relative;
}

.empty__img-1 {
  position: absolute;
  left: 102px;
}

.empty__img {
  position: absolute;
  left: 10px;
}

.empty__container {
  width: 100%;
  text-align: center;
  width: 342px;
}

.empty__illustration {
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
</style>
