<template>
  <div class="bg-white dark:bg-[#0a0e19] py-[60px] md:py-[80px] lg:py-[135px]">
    <div
        class="mx-auto px-[12.5px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1255px]"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-[25px] items-center">
        <div
            class="xl:ltr:-mr-[25px] xl:rtl:-ml-[25px] 2xl:ltr:-mr-[45px] 2xl:rtl:-ml-[45px] rounded-[25px] order-2 lg:order-1"
        >
          <img
              src="@/assets/images/illustration/undraw_fingerprint-login_19qv.svg"
              alt="sign-in-image"
              class="rounded-[25px]"
          />
        </div>
        <div
            class="xl:ltr:pl-[90px] xl:rtl:pr-[90px] 2xl:ltr:pl-[120px] 2xl:rtl:pr-[120px] order-1 lg:order-2"
        >
          <img
              src="@/assets/images/logo/Logo-text.png"
              alt="logo"
              class="inline-block dark:hidden"
          />
          <div class="my-[17px] md:my-[25px]">
            <h1
                class="!font-semibold !text-[22px] md:!text-xl lg:!text-2xl !mb-[5px] md:!mb-[7px]"
            >
              Welcome back to Trezo!
            </h1>
          </div>
          <form @submit.prevent="handleLogin">

            <div class="mb-[15px] relative">
              <label
                  class="mb-[10px] md:mb-[12px] text-black dark:text-white font-medium block"
              >
                Username or Email Address
              </label>
              <input
                  v-model="credentials.identifier"
                  type="text"
                  required
                  class="h-[55px] rounded-md text-black dark:text-white border border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500"
                  placeholder="Type your username or email address"
              />
            </div>
            <div class="mb-[15px] relative" id="passwordHideShow">
              <label
                  class="mb-[10px] md:mb-[12px] text-black dark:text-white font-medium block"
              >
                Password
              </label>
              <input
                  v-model="credentials.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="h-[55px] rounded-md text-black dark:text-white border border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500"
                  id="password"
                  placeholder="Type password"
              />
              <button
                  @click="changShowPassword()"
                  class="absolute text-lg ltr:right-[20px] rtl:left-[20px] bottom-[12px] transition-all hover:text-primary-500"
                  id="toggleButton"
                  type="button"
              >
                <i :class="showPassword ? 'ri-eye-line' : 'ri-eye-off-line'"></i>
              </button>
            </div>
<!--            <RouterLink-->
<!--                to="/authentication/forgot-password"-->
<!--                class="inline-block text-primary-500 transition-all font-semibold hover:underline"-->
<!--            >-->
<!--              Forgot Password?-->
<!--            </RouterLink>-->
            <button
                type="submit"
                :disabled="loading"
                class="md:text-md block w-full text-center transition-all rounded-md font-medium mt-[20px] md:mt-[25px] py-[12px] px-[25px] text-white bg-primary-500 hover:bg-primary-400"
            >
            <span class="flex items-center justify-center gap-[5px]">
              <i v-if="!loading"  class="material-symbols-outlined"> login </i>
              <svg v-if="loading" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
              </svg>
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </span>

            </button>
          </form>

<!--          <p class="mt-[15px] md:mt-[20px]">-->
<!--            Don’t have an account.-->
<!--            <RouterLink-->
<!--                to="/authentication/sign-up"-->
<!--                class="text-primary-500 transition-all font-semibold hover:underline"-->
<!--            >-->
<!--              Sign Up-->
<!--            </RouterLink>-->
<!--          </p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAuth } from "@/components/composables/useAuth";
import {toast} from "vue3-toastify";
import { authService } from '@/components/services/api.js';

const { login, logout } = useAuth();

const loading = ref(false);
const showPassword = ref(false);
const credentials = ref({
  identifier: "",
  password: "",
});

onMounted(() => {
  // logout();
  document.body.classList.add("bg-white");
});

onBeforeUnmount(() => {
  document.body.classList.remove("bg-white");
});

const changShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  loading.value = true;
  try {
    await login(credentials.value);
    console.log(credentials.value)
    console.log("Login successful");
  } catch (error) {
    console.error("Login error:", error);
  } finally {
    loading.value = false;
    console.log("finally", loading.value);
  }
};
</script>

