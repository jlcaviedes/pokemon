<script setup lang="ts">
import Sidebar from "../components/sidebar/Sidebar.vue";
</script>

<template>
  <div class="dashboard">
    <Sidebar />
    <main class="dashboard__content">
      <header class="mobile-header">
        <h1></h1>
      </header>
      <router-view />
    </main>
  </div>
</template>

<style type="css">
.dashboard {
  min-height: 100vh;
  display: flex;
}

.dashboard__content {
  margin-left: 240px;
  width: 100%;
}

@media (max-width: 768px) {
  .dashboard {
    display: block;
    padding-bottom: 70px;
  }

  .dashboard__content {
    margin-left: 0;
  }
}
</style>
