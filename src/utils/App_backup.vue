<template>
  <div>
    <div>
      <LeftSidebar v-if="shouldShowSidebar && !isNotFound" />
      <TopHeader v-if="shouldShowHeader && !isNotFound" />

      <div
          :class="[
          'main-content transition-all flex flex-col overflow-hidden min-h-screen',
          {
            active: stateStoreInstance.open,
            'padding-minus': shouldShowPaddingZero || isNotFound,
          },
        ]"
      >
        <router-view />
        <div class="grow"></div>
        <MainFooter v-if="shouldShowFooter && !isNotFound" />
      </div>

      <AddNewTaskPopup />
      <AddNewCardPopup />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import stateStore from "./utils/store";

import LeftSidebar from "./components/Layouts/LeftSidebar.vue";
import TopHeader from "./components/Layouts/TopHeader/index.vue";
import MainFooter from "./components/Layouts/MainFooter.vue";
import AddNewTaskPopup from "./components/Layouts/AddNewTaskPopup.vue";
import AddNewCardPopup from "./components/Layouts/AddNewCardPopup.vue";

const direction = ref("ltr");
const stateStoreInstance = stateStore;
const route = useRoute();
const router = useRouter();

// Routes that do not require authentication
const publicRoutes = [
  "/features",
  "/team",
  "/faq",
  "/contact",
  "/authentication/sign-in",
  "/login",
  "/authentication/sign-up",
  "/authentication/forgot-password",
  "/authentication/reset-password",
  "/authentication/confirm-email",
  "/lock-screen",
  "/authentication/logout",
  "/extra-pages/coming-soon",
];

const shouldShowSidebar = computed(() => !publicRoutes.includes(route.path));
const shouldShowPaddingZero = computed(() => publicRoutes.includes(route.path));
const shouldShowHeader = computed(() => !publicRoutes.includes(route.path));
const shouldShowDiv = computed(() => !publicRoutes.includes(route.path));
const shouldShowFooter = computed(() => !publicRoutes.includes(route.path));

const isNotFound = computed(() =>
    route.matched.some(
        (record: { path: string }) => record.path === "/:pathMatch(.*)*"
    )
);

// 🔒 Redirect to /login if no token
onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token && !publicRoutes.includes(route.path)) {
    router.push("/login");
  }

  watchEffect(() => {
    if (stateStore.open) {
      document.body.classList.remove("sidebar-show");
      document.body.classList.add("sidebar-hide");
    } else {
      document.body.classList.remove("sidebar-hide");
      document.body.classList.add("sidebar-show");
    }
  });
});

// Watch direction (RTL / LTR)
watch(
    direction,
    (newDirection) => {
      document.body.setAttribute("dir", newDirection);
    },
    { immediate: true }
);
</script>
