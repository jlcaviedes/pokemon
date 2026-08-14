<script setup lang="ts">
import searchIcon from "../../../assets/icons/search.png";
const emit = defineEmits<{ "click-search": [] }>();
const onClickDisplay = () => {
  emit("click-search");
};
</script>

<template>
  <div class="search-container">
    <div class="search-container__search" @click.stop="onClickDisplay">
      <img :src="searchIcon" alt="Search" />
      <input v-model="search" type="search" placeholder="Procurar Pókemon..." />
    </div>
    <button type="button">
      <img :src="searchIcon" alt="Search" />
    </button>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  width: 350px;
  column-gap: 16px;
}

.search-container__search {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 12px 16px;

  border: 1px solid #e0e0e0;
  border-radius: 30px;
  background-color: #fff;
}

.search-container input {
  border: none;
  padding: 0px 16px;
  background-color: #fff;
  color: black;
  outline: none;
}

.search-container button {
  width: 52px;
  height: 52px;

  border: none;
  border-radius: 50%;

  cursor: pointer;
  background-color: #fff;
  border: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .search-container {
    width: 100%;
  }
}
</style>
