<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../components/sidebar/Sidebar.vue";
</script>

<template>
  <div class="dashboard">
    <Sidebar />

    <main class="content">
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

.content {
  margin-left: 240px;
  width: 100%;
}

/* MOBILE */
@media (max-width: 768px) {
  .dashboard {
    display: block;
    padding-bottom: 70px;
  }

  .content {
    margin-left: 0;
  }
}
</style>
