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
  <div v-if="open" class="modal-overlay" @click.self="cancel">
    <section class="filter-modal">
      <header class="modal-header">
        <h2>Filtra por tus preferencias</h2>
        <div class="filter-modal__close-button">
          <button type="button" class="close-button" @click="cancel">×</button>
        </div>
      </header>

      <div class="modal-content">
        <div class="filter-modal__select">
          <label class="select-label"> Tipo </label>
          <Icon :name="ICONS.ArrowUp" />
        </div>

        <div class="filter-modal__type-select">
          <div class="filter-modal__display">
            <button
              v-for="type in types"
              :key="type"
              type="button"
              class="type-option"
              :class="{
                selected: selected.includes(type),
              }"
              @click="toggleType(type)"
            >
              <span class="checkbox">
                <span v-if="selected.includes(type)"> ✓ </span>
              </span>

              <span class="type-name">
                {{ type }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <footer class="modal-footer">
        <button type="button" class="cancel-button" @click="cancel">
          Cancelar
        </button>

        <button type="button" class="apply-button" @click="apply">
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

.modal-overlay {
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

/* HEADER */

.modal-header {
  display: flex;

  justify-content: space-between;
  align-items: center;

  padding: 20px 24px;

  border-bottom: 1px solid #eee;
  flex-direction: row-reverse;
}

.modal-header h2 {
  margin: 0;

  font-size: 20px;
}

.close-button {
  width: 32px;
  height: 32px;

  border: none;

  background: transparent;

  font-size: 26px;

  color: #777;

  cursor: pointer;
}

/* CONTENT */

.modal-content {
  padding: 24px;

  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}

.select-label {
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

.type-option {
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

/* CHECKBOX */

.checkbox {
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

.type-option.selected .checkbox {
  background: #1f49b6;
  border-color: #222;
  color: white;
}

.type-name {
  width: 100%;
  text-align: left;
  text-transform: capitalize;
  font-size: 14px;
}

/* FOOTER */

.modal-footer {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  padding: 16px 24px;

  border-top: 1px solid #eee;
}

.cancel-button,
.apply-button {
  padding: 10px 18px;

  font-weight: 600;

  cursor: pointer;
  width: 100%;
}

.cancel-button {
  border: 1px solid #ddd;
  color: #121212;
  background: #eeeeee;
}

/* MOBILE */

@media (max-width: 600px) {
  .modal-overlay {
    align-items: flex-end;

    padding: 0;
  }

  .modal-header {
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

  .modal-footer {
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
