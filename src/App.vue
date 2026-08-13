<script setup lang="ts">
import { ref, onMounted } from "vue";
import DashboardView from "./ui/views/DashboardView.vue";
import LoginView from "./ui/views/LoginView.vue";
import OnboardingView from "./ui/views/OnboardingView.vue";

const loading = ref(true);
const onboarding = ref(false);

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  const completed = localStorage.getItem("onboarding_completed");
  onboarding.value = completed !== "true";
  loading.value = false;
});

const finishOnboarding = () => {
  localStorage.setItem("onboarding_completed", "true");
  onboarding.value = false;
};
</script>

<template>
  <LoginView v-if="loading" />
  <OnboardingView v-else-if="onboarding" @complete="finishOnboarding" />
  <DashboardView v-else />
</template>
