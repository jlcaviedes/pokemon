<script setup lang="ts">
import { ref } from "vue";
import spriteHilda from "../../assets/images/hilda.png";
import spriteChild from "../../assets/images/child.png";
import spriteDoctor from "../../assets/images/doctor.png";

const text = ref("Continuar");
const step = ref(0);

const emit = defineEmits<{
  complete: [];
}>();

const nextStep = () => {
  if (step.value >= 1) {
    emit("complete");
    return;
  }
  step.value += 1;
  text.value = "Empecemos";
};
</script>

<template>
  <main class="onboarding">
    <section class="onboarding__step" v-if="step == 0">
      <div class="onboarding__step-1">
        <img
          class="onboarding__illustration onboarding__img-2"
          :src="spriteChild"
          alt="hilda"
        />
        <img
          class="onboarding__illustration onboarding__img-1"
          :src="spriteDoctor"
          alt="hilda"
        />
      </div>

      <h1>Todos los Pokémon en un solo lugar</h1>
      <p>
        Accede a una amplia lista de Pokémon de todas las generaciones creadas
        por Nintendo
      </p>
    </section>

    <section class="onboarding__step" v-else-if="step == 1">
      <img class="onboarding__illustration" :src="spriteHilda" alt="hilda" />
      <h1>Mantén tu Pokédex actualizada</h1>
      <p>
        Regístrate y guarda tu perfil, Pokémon favoritos, configuraciones y
        mucho más en la aplicación
      </p>
    </section>

    <div class="onboarding__indicators">
      <span :class="{ active: step === 0 }"></span>
      <span :class="{ active: step === 1 }"></span>
    </div>
    <button @click="nextStep">{{ text }}</button>
  </main>
</template>

<style scoped>
.onboarding {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.onboarding__step-1 {
  max-height: 265px;
  height: 265px;
  max-width: 342px;
  position: relative;
}

.onboarding__img-1 {
  position: absolute;
  left: 102px;
}

.onboarding__img-2 {
  position: absolute;
  left: 10px;
}

.onboarding__step {
  width: 100%;
  text-align: center;
  width: 342px;
}

.onboarding__illustration {
  margin-bottom: 32px;
  width: 251px;
  height: 258.59px;
}

h1 {
  margin-bottom: 16px;
  font-size: 26px;
  font-weight: 500;
}

p {
  line-height: 1.6;
  margin-bottom: 32px;
  font-size: 14px;
}

.onboarding__indicators {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
}

.onboarding__indicators span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ccc;
}

.onboarding__indicators span.active {
  width: 28px;
  background: #4565b7;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
}
</style>
