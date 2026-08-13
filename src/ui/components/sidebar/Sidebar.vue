<script setup lang="ts">
import type { SidebarItem } from "./sidebar.types";
</script>

<template>
  <aside class="sidebar">
    <router-link to="/pokedex">
      <span>Pokedex</span>
    </router-link>

    <router-link to="/regions">
      <span>Regiones</span>
    </router-link>

    <router-link to="/favorites">
      <span>favoritos</span>
    </router-link>

    <router-link to="/profile">
      <span>Perfil</span>
    </router-link>
  </aside>
</template>

<style type="css">
.sidebar {
  width: 240px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
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

  .sidebar {
    width: 100%;
    height: 70px;

    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;

    display: flex;
    flex-direction: row;
  }

  .content {
    margin-left: 0;
  }
}
</style>
