import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import PokemonList from "../List.vue";

describe("PokemonList", () => {
  it("should show list of pokemons", () => {
    const wrapper = mount(PokemonList, {
      props: {
        pokemons: [
          {
            id: 25,
            name: "pikachu",
            image: "/pikachu.png",
            types: ["electric"],
          },
          {
            id: 1,
            name: "bulbasaur",
            image: "/bulbasaur.png",
            types: ["grass", "poison"],
          },
        ],
        favorites: [],
      },
    });

    expect(wrapper.text()).toContain("pikachu");
    expect(wrapper.text()).toContain("bulbasaur");
  });
});
