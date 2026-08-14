<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "../../core/pokemon/pokemon.store";
import FavoriteIcon from "../components/favorite/FavoriteIcon.vue";
import Attribute from "../components/attribute/Attribute.vue";

import weightIcon from "../../assets/icons/weight.svg";
import heightIcon from "../../assets/icons/height.svg";
import categoryIcon from "../../assets/icons/category.svg";
import pokeballIcon from "../../assets/icons/pokeball.svg";

const route = useRoute();
const pokemonStore = usePokemonStore();

const isFavorite = ref(false);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const pokemon = ref({
  id: 0,
  name: "",
  image: "",
  types: [""],
  description: "",
  weight: 0,
  height: 0,
  category: "",
  abilities: [""],
  gender: {
    female: 0,
    male: 0,
  },

  weaknesses: [""],
  favorite: false,
});

onMounted(async () => {
  const { pokemonName } = route.params;

  if (pokemonName) {
    await pokemonStore.getPokemon(pokemonName as string);
    const detail = pokemonStore.pokemonDetail;
    pokemon.value = {
      ...pokemon.value,
      id: detail?.id ?? 0,
      image: detail?.image ?? "",
      name: detail?.name ?? "",
      types: detail?.types ?? [],
      description: detail?.description ?? "",
      weight: detail?.weight ?? 0,
      height: detail?.height ?? 0,
      category: detail?.category ?? "",
      abilities: detail?.abilities ?? [""],
      gender: detail?.gender ?? { female: 0, male: 0 },
      weaknesses: detail?.weaknesses ?? [],
      favorite: pokemonStore.favorites.includes(detail?.id ?? 0),
    };
  }
});
</script>

<template>
  <main class="pokemon-detail">
    <div class="pokemon-detail__heart">
      <FavoriteIcon :favorite="pokemon.favorite" />
    </div>

    <!-- IMAGE -->
    <section class="pokemon-image-section">
      <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
    </section>

    <!-- NAME -->
    <section class="pokemon-header">
      <h1>
        {{ pokemon.name }}
      </h1>

      <span class="pokemon-number">
        #{{ pokemon.id.toString().padStart(3, "0") }}
      </span>
    </section>

    <!-- TYPES -->
    <section class="types">
      <span v-for="type in pokemon.types" :key="type" class="type-tag">
        {{ type }}
      </span>
    </section>

    <!-- DESCRIPTION -->
    <section class="description">
      <p>
        {{ pokemon.description }}
      </p>
    </section>
    <hr />
    <!-- INFORMATION -->
    <section class="information">
      <Attribute
        label="Peso"
        :text="pokemon.weight + 'kg'"
        :icon="weightIcon"
      />

      <Attribute
        label="Altura"
        :text="pokemon.height + 'm'"
        :icon="heightIcon"
      />

      <Attribute
        label="Categoría"
        :text="pokemon.category"
        :icon="categoryIcon"
      />

      <Attribute
        label="Habilidad"
        :text="pokemon.abilities[0]"
        :icon="pokeballIcon"
      />
    </section>

    <!-- GENDER -->
    <section class="gender">
      <h2>Género</h2>

      <div class="gender-bar">
        <div
          class="male"
          :style="{
            width: `${pokemon.gender.male}%`,
          }"
        />
        <div
          class="female"
          :style="{
            width: `${pokemon.gender.female}%`,
          }"
        />
      </div>
      <div class="gender-values">
        <span> ♂ {{ pokemon.gender.male }}% </span>
        <span> ♀ {{ pokemon.gender.female }}% </span>
      </div>
    </section>

    <!-- WEAKNESSES -->
    <section class="weaknesses">
      <h2>Debilidades</h2>

      <div class="weakness-tags">
        <span
          v-for="weakness in pokemon.weaknesses"
          :key="weakness"
          class="weakness-tag"
        >
          {{ weakness }}
        </span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.pokemon-detail {
  max-width: 700px;

  margin: 0 auto;

  padding: 32px 24px 100px;
}

.pokemon-detail__heart {
  display: flex;
  justify-content: flex-end;
}

/* IMAGE */

.pokemon-image-section {
  display: flex;

  justify-content: center;
  align-items: center;

  margin-bottom: 24px;
}

.pokemon-image {
  width: 280px;
  height: 280px;

  object-fit: contain;
}

/* HEADER */

.pokemon-header {
  text-align: left;
}

.pokemon-header h1 {
  margin: 0;

  font-size: 32px;
  font-style: Medium;

  text-transform: capitalize;
}

.pokemon-number {
  display: block;

  margin-top: 6px;

  color: #888;

  font-size: 16px;

  font-weight: 600;
}

/* TYPES */

.types {
  display: flex;

  justify-content: center;

  gap: 8px;

  margin-top: 16px;
}

.type-tag,
.weakness-tag {
  padding: 7px 14px;

  border-radius: 999px;

  font-size: 13px;

  font-weight: 600;

  text-transform: capitalize;
}

.type-tag {
  background: #f8d030;
}

/* DESCRIPTION */

.description {
  margin-top: 32px;

  color: #555;

  line-height: 1.7;

  text-align: center;
}

/* INFORMATION */

.information {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 12px;

  margin-top: 32px;
}

/* GENDER */

.gender {
  margin-top: 36px;
}

.gender h2,
.weaknesses h2 {
  margin-bottom: 16px;

  font-size: 20px;
}

.gender-values {
  display: flex;

  justify-content: space-between;

  margin-bottom: 8px;
}

.gender-bar {
  display: flex;

  width: 100%;

  height: 10px;

  overflow: hidden;

  border-radius: 999px;

  background: #eee;
}

.female {
  background: #e98ca5;
}

.male {
  background: #6ca8dc;
}

/* WEAKNESSES */

.weaknesses {
  margin-top: 36px;
}

.weakness-tags {
  display: flex;

  flex-wrap: wrap;

  gap: 8px;
}

.weakness-tag {
  background: #f1f1f1;
}

/* MOBILE */

@media (max-width: 600px) {
  .pokemon-detail {
    padding: 24px 16px 100px;
  }

  .pokemon-image {
    width: 220px;
    height: 220px;
  }

  .pokemon-header h1 {
    font-size: 30px;
  }

  .information {
    grid-template-columns: 1fr;
  }
}
</style>
