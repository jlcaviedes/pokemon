<script setup lang="ts">
import { ref, watch } from "vue";
import Icon from "../icon/Icon.vue";
import { ICONS } from "../icon/icon.types";

const props = defineProps<{
  open: boolean;
  types: string[];
  selectedTypes: string[];
}>();

const emit = defineEmits<{
  close: [];
  apply: [types: string[]];
}>();

const selected = ref<string[]>([]);

watch(
  () => props.open,
  (open) => {
    if (open) {
      selected.value = [...props.selectedTypes];
    }
  },
);

const toggleType = (type: string) => {
  if (selected.value.includes(type)) {
    selected.value = selected.value.filter((item) => item !== type);
  } else {
    selected.value.push(type);
  }
};

const apply = () => {
  emit("apply", [...selected.value]);
};

const cancel = () => {
  emit("close");
};
</script>

<template>
  <div v-if="open" class="filter-modal__overlay" @click.self="cancel">
    <section class="filter-modal">
      <header class="filter-modal__header">
        <h2>Filtra por tus preferencias</h2>
        <div class="filter-modal__close-button">
          <button
            type="button"
            class="filter-modal__close-button"
            @click="cancel"
          >
            ×
          </button>
        </div>
      </header>

      <div class="filter-modal__content">
        <div class="filter-modal__select">
          <label class="filter-modal__select-label"> Tipo </label>
          <Icon :name="ICONS.ArrowUp" />
        </div>

        <div class="filter-modal__type-select">
          <div class="filter-modal__display">
            <button
              v-for="type in types"
              :key="type"
              type="button"
              class="filter-modal__type-option"
              :class="{
                selected: selected.includes(type),
              }"
              @click="toggleType(type)"
            >
              <span class="filter-modal__checkbox">
                <span v-if="selected.includes(type)"> ✓ </span>
              </span>

              <span class="filter-modal__type-name">
                {{ type }}
              </span>
              <div :class="`bg-${type}-dark filter-modal__type-circle`"></div>
            </button>
          </div>
        </div>
      </div>

      <footer class="filter-modal__footer">
        <button
          type="button"
          class="filter-modal__cancel-button"
          @click="cancel"
        >
          Cancelar
        </button>

        <button type="button" class="filter-modal__apply-button" @click="apply">
          Aplicar
        </button>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.filter-modal__select {
  display: flex;
  justify-content: space-between;
}

.filter-modal__display {
  overflow-y: auto;
}

.filter-modal__overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgb(0 0 0 / 45%);
  z-index: 2000;
}

.filter-modal {
  width: 100%;
  max-width: 420px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgb(0 0 0 / 20%);
}

.filter-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  flex-direction: row-reverse;
}

.filter-modal__header h2 {
  margin: 0;
  font-size: 20px;
}

.filter-modal__close-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 26px;
  color: #777;
  cursor: pointer;
}

.filter-modal__content {
  padding: 24px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}

.filter-modal__select-label {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
}

.filter-modal__type-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.filter-modal__type-option {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  padding: 0px 12px;
  border: none;
  border-radius: 10px;
  background: white;
  color: #121212;
  cursor: pointer;
  transition: 0.2s ease;
  width: 100%;
}

.filter-modal__checkbox {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 13px;
}

.filter-modal__type-option.selected .filter-modal__checkbox {
  background: #1f49b6;
  border-color: #222;
  color: white;
}

.filter-modal__type-name {
  width: 100%;
  text-align: left;
  text-transform: capitalize;
  font-size: 14px;
}

.filter-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid #eee;
}

.filter-modal__cancel-button,
.filter-modal__apply-button {
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}

.filter-modal__cancel-button {
  border: 1px solid #ddd;
  color: #121212;
  background: #eeeeee;
}

.filter-modal__type-circle {
  max-height: 17px;
  height: 17px;
  max-width: 25px;
  width: 25px;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .filter-modal__overlay {
    align-items: flex-end;
    padding: 0;
  }

  .filter-modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #eee;
    flex-direction: column-reverse;
  }

  .filter-modal__close-button {
    width: 100%;
    display: flex;
  }

  .filter-modal__footer {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }

  .filter-modal {
    max-width: none;
    max-height: 85vh;
    border-radius: 20px 20px 0 0;
  }
}
</style>
