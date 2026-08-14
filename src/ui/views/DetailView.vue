<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "../../core/pokemon/pokemon.store";
import FavoriteIcon from "../components/favorite/FavoriteIcon.vue";
import Attribute from "../components/attribute/Attribute.vue";
import TypeTag from "../components/type-tag/TypeTag.vue";

import weightIcon from "../../assets/icons/weight.svg";
import heightIcon from "../../assets/icons/height.svg";
import categoryIcon from "../../assets/icons/category.svg";
import pokeballIcon from "../../assets/icons/pokeball.svg";
import Empty from "../components/empty/Empty.vue";

const route = useRoute();
const pokemonStore = usePokemonStore();
const okRequest = ref(false);

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

const load = async () => {
  const { pokemonName } = route.params;

  if (pokemonName) {
    await pokemonStore.getPokemon(pokemonName as string);
    okRequest.value = pokemonStore.error === null;

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
  } else {
    okRequest.value = false;
  }
};

onMounted(() => {
  load();
});
</script>

<template>
  <main v-if="okRequest" class="detail">
    <section class="detail__image-section">
      <div class="detail__moon" :class="`bg-${pokemon.types[0]}-dark`"></div>
      <div class="detail__heart">
        <FavoriteIcon :favorite="pokemon.favorite" />
      </div>
      <img :src="pokemon.image" :alt="pokemon.name" class="detail__image" />
    </section>

    <section class="detail__header">
      <h1>
        {{ pokemon.name }}
      </h1>

      <span class="detail__number">
        #{{ pokemon.id.toString().padStart(3, "0") }}
      </span>
    </section>

    <section class="detail__types">
      <TypeTag v-for="type in pokemon.types" :key="type" :type="type">
      </TypeTag>
    </section>

    <section class="detail__description">
      <p>
        {{ pokemon.description }}
      </p>
    </section>
    <hr />
    <!-- INFORMATION -->
    <section class="detail__information">
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

    <section class="detail__gender">
      <h2>Género</h2>

      <div class="detail__gender-bar">
        <div
          class="detail__male"
          :style="{
            width: `${pokemon.gender.male}%`,
          }"
        />
        <div
          class="deatail__female"
          :style="{
            width: `${pokemon.gender.female}%`,
          }"
        />
      </div>
      <div class="detail__gender-values">
        <span> ♂ {{ pokemon.gender.male }}% </span>
        <span> ♀ {{ pokemon.gender.female }}% </span>
      </div>
    </section>

    <section class="detail__weaknesses">
      <h2>Debilidades</h2>

      <div class="detail__weakness-tags">
        <TypeTag
          v-for="weakness in pokemon.weaknesses"
          :key="weakness"
          :type="weakness"
        >
          {{ weakness }}
        </TypeTag>
      </div>
    </section>
  </main>
  <Empty
    v-else
    title="Algo salió mal..."
    description="No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde."
    :isRetry="true"
    @retry="load"
  />
</template>

<style scoped>
.detail__moon {
  width: 500px;
  max-width: 500px;
  min-width: 500px;
  height: 500px;
  position: absolute;
  border-radius: 100%;
  top: -230px;
  z-index: 50;
}

.detail {
  max-width: 500px;
  margin: 0 auto;
  padding: 32px 24px 100px;
}

.detail__heart {
  display: flex;
  justify-content: flex-end;
  width: 280px;
  z-index: 100;
  padding: 50px 0px;
}

/* IMAGE */

.detail__image-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 24px;
  max-height: 360px;
  height: 360px;
  overflow: hidden;
}

.detail__image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  z-index: 100;
}

/* HEADER */

.detail__header {
  text-align: left;
}

.detail__header h1 {
  margin: 0;

  font-size: 32px;
  font-style: Medium;

  text-transform: capitalize;
}

.detail__number {
  display: block;

  margin-top: 6px;

  color: #888;

  font-size: 16px;

  font-weight: 600;
}

/* TYPES */

.detail__types {
  display: flex;

  justify-content: left;

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

/* DESCRIPTION */

.detail__description {
  margin-top: 32px;

  color: #555;

  line-height: 1.7;

  text-align: center;
}

/* INFORMATION */

.detail__information {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 12px;

  margin-top: 32px;
}

/* GENDER */

.detail__gender {
  margin-top: 36px;
}

.detail__gender h2,
.detail__weaknesses h2 {
  margin-bottom: 16px;

  font-size: 20px;
}

.detail__gender-values {
  display: flex;

  justify-content: space-between;

  margin-bottom: 8px;
}

.detail__gender-bar {
  display: flex;

  width: 100%;

  height: 10px;

  overflow: hidden;

  border-radius: 999px;

  background: #eee;
}

.deatail__female {
  background: #e98ca5;
}

.detail__male {
  background: #6ca8dc;
}

/* WEAKNESSES */

.detail__weaknesses {
  margin-top: 36px;
}

.detail__weakness-tags {
  display: flex;

  flex-wrap: wrap;

  gap: 8px;
}

.weakness-tag {
  background: #f1f1f1;
}

/* MOBILE */

@media (max-width: 600px) {
  .detail {
    padding: 24px 16px 100px;
  }

  .detail__image {
    width: 220px;
    height: 220px;
  }

  .detail__header h1 {
    font-size: 30px;
  }

  .detail__information {
    grid-template-columns: 1fr;
  }
}
</style>
