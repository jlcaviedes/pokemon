<template>
  <div class="search-container">
    <input v-model="search" type="search" placeholder="Procurar Pókemon..." />

    <button type="button">🔍</button>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  width: 350px;
  column-gap: 16px;
}

.search-container input {
  flex: 1;
  padding: 12px 16px;

  border: 1px solid #e0e0e0;
  border-radius: 30px;
  background-color: #fff;
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
