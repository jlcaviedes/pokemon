import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import PokemonCard from "../Card.vue";

describe("PokemonCard", () => {
  it("should show the name of pokemon", () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: {
          id: 25,
          name: "pikachu",
          image: "/pikachu.png",
          types: ["electric"],
        },
      },
    });

    expect(wrapper.text()).toContain("pikachu");
  });
});
