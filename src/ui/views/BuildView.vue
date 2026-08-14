<script setup lang="ts">
import spriteFish from "../../assets/images/jigglypuff.png";
</script>

<template>
  <main class="build">
    <section class="build__container">
      <div>
        <img class="build__illustration" :src="spriteFish" alt="fish" />
      </div>

      <h1>¡Muy pronto disponible!</h1>
      <p>
        Estamos trabajando para traerte esta sección. Vuelve más adelante para
        descubrir todas las novedades.
      </p>
    </section>
  </main>
</template>

<style scoped>
.build {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 24px;
}

.build__container {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.build__illustration {
  width: 169px;
  height: 210px;
  object-fit: cover;
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
