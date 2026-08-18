<script setup lang="ts">
import pokedexIcon from "../../../assets/icons/house.png";
import regionsIcon from "../../../assets/icons/globe.png";
import favoritesIcon from "../../../assets/icons/heart.png";
import profileIcon from "../../../assets/icons/user.png";
</script>

<template>
  <aside class="sidebar">
    <router-link
      class="sidebar__item"
      active-class="sidebar__active"
      to="/pokedex"
    >
      <img :src="pokedexIcon" alt="Pokedex" />
      <span>Pokedex</span>
    </router-link>

    <router-link
      class="sidebar__item"
      to="/regions"
      active-class="sidebar__active"
    >
      <img :src="regionsIcon" alt="Regions" />
      <span>Regiones</span>
    </router-link>

    <router-link
      class="sidebar__item"
      to="/favorites"
      active-class="sidebar__active"
    >
      <img :src="favoritesIcon" alt="favorites" />
      <span>favoritos</span>
    </router-link>

    <router-link
      class="sidebar__item"
      to="/profile"
      active-class="sidebar__active"
    >
      <img :src="profileIcon" alt="Profile" />
      <span>Perfil</span>
    </router-link>
  </aside>
</template>
<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  background: #ffffff;
  border-right: 1px solid #e5e5e5;
  z-index: 1000;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 6px;
  color: #666;
  text-decoration: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.sidebar__item:hover {
  background: #f5f5f5;
  color: #222;
}

.sidebar__item.router-link-active {
  background: #f0f0f0;
  color: #222;
}

.sidebar-icon {
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.sidebar-label {
  white-space: nowrap;
}

.sidebar__active {
  filter: invert(35%) sepia(97%) saturate(1168%) hue-rotate(186deg)
    brightness(83%) contrast(92%);
}

@media (max-width: 768px) {
  .sidebar {
    position: relative;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 72px;
    flex-direction: row;
    padding: 8px 12px;
    border-right: none;
    border-top: 1px solid #e5e5e5;
    justify-content: space-around;
  }

  .sidebar__item {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    margin: 0;
    padding: 6px 4px;
    border-radius: 10px;
    font-size: 11px;
  }
}
</style>
