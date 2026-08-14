<script setup lang="ts"></script>

<template>
  <div class="loading-view">
    <div class="pokeball">
      <div class="pokeball__center"></div>
    </div>
  </div>
</template>

<style scoped>
.loading-view {
  position: fixed;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fff;

  z-index: 9999;
}

.pokeball {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    #e3350d 0%,
    #e3350d 47%,
    #222 47%,
    #222 53%,
    #f5f5f5 53%,
    #f5f5f5 100%
  );
  border: 5px solid #222;
  position: relative;
  animation: rotate-pokeball 1.2s linear infinite;
}

.pokeball__center {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  border: 5px solid #222;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes rotate-pokeball {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.loading-view p {
  margin-top: 24px;
  font-size: 18px;
  font-weight: 600;
}
</style>
