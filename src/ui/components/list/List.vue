<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Pokemon } from "../../../core/pokemon/pokemon.types.ts";
import PokemonCard from "../card/Card.vue";

const { pokemons, favorites } = defineProps<{
  pokemons: Pokemon[];
  favorites: Number[];
}>();

const emit = defineEmits();
const divElement = ref<HTMLDivElement | null>(null);
const isDeleteCard = ref(false);

const onDeleteCard = () => {
  isDeleteCard.value = !isDeleteCard.value;
};

const onFavorite = (pokemonId: number) => {
  const favoritesCurrent = [...favorites] as number[];
  favoritesCurrent.includes(pokemonId)
    ? favoritesCurrent.splice(favoritesCurrent.indexOf(pokemonId), 1)
    : favoritesCurrent.push(pokemonId);

  emit("select-favorites", favoritesCurrent);
};

const handleScroll = (e: any) => {
  const element = divElement.value;
  if (!element) {
    return;
  }
  const { scrollTop, clientHeight, scrollHeight } = e.target;
  const scrollPosition = clientHeight + scrollTop;
  const pageHeight = scrollHeight;

  if (scrollPosition >= pageHeight - 300) {
    emit("scroll-down");
  }
};

const hasScroll = () => {
  if (!divElement.value) {
    return false;
  }

  return divElement.value.scrollHeight > divElement.value.clientHeight;
};

onMounted(() => {
  divElement.value?.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  divElement.value?.removeEventListener("scroll", handleScroll);
});

defineExpose({ hasScroll });
</script>

<template>
  <section class="list" ref="divElement">
    <div class="list__scroll">
      <div
        class="list__card-wrapper"
        :class="isDeleteCard ? 'list__card--move' : ''"
      >
        <PokemonCard
          class="list__card"
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
          :favorite="favorites.includes(pokemon.id)"
          @click-favorite="onFavorite(pokemon.id)"
          @click-card="() => emit('select-pokemon', pokemon.name)"
          @click-lond-press="() => onDeleteCard()"
        />
      </div>
    </div>
    <div style="height: 100px"></div>
  </section>
</template>

<style scoped>
.list {
  gap: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
}
.list__scroll {
  overflow: hidden;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(112px, 1fr));
  width: 100%;
  gap: 20px;
}

.list__card {
  width: 330px;
  height: 110px;
}

.list__card-wrapper {
  display: flex;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: fit-content;
  height: fit-content;
  animation: alternate;
}

.list__card--move {
  padding-right: 30px;
}

@media (max-width: 768px) {
  .list__scroll {
    grid-template-columns: 1fr;
  }
}
</style>
