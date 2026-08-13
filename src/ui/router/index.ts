import { createRouter, createWebHistory } from "vue-router";

import DetailView from "../views/DetailView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import PokedexView from "../views/PokedexView.vue";
import RegionsView from "../views/RegionsView.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/detail",
      name: "detail",
      component: DetailView,
    },
    {
      path: "/regions",
      name: "regions",
      component: RegionsView,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesView,
    },
    {
      path: "/pokedex",
      name: "pokedex",
      component: PokedexView,
    },
  ],
});

export default router;
