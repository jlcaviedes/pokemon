<script setup lang="ts">
import Sidebar from "../components/sidebar/Sidebar.vue";
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <main class="dashboard__content">
      <router-view />
    </main>
  </div>
</template>

<style type="css">
.dashboard {
  min-height: 100vh;
  display: flex;
  height: 100vh;
}

.dashboard__content {
  margin-left: 240px;
  width: 100%;
}

@media (max-width: 768px) {
  .dashboard {
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    height: 100vh;
  }

  .dashboard__content {
    margin-left: 0;
    height: 100%;
    overflow: hidden;
  }
}
</style>
