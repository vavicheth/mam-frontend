<template>
  <PageTitle pageTitle="User Details" subTitle="Users" />

  <!-- Loading State -->
  <div v-if="isLoading" class="trezo-card bg-white dark:bg-[#0c1427] mb-[25px] p-[20px] md:p-[25px] rounded-md">
    <div class="flex flex-col items-center justify-center py-20">
      <div role="status">
        <svg aria-hidden="true" class="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Loading user details...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="trezo-card bg-white dark:bg-[#0c1427] mb-[25px] p-[20px] md:p-[25px] rounded-md">
    <div class="flex flex-col items-center justify-center py-20">
      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-danger-50 dark:bg-danger-500/10 rounded-full mb-4">
        <i class="material-symbols-outlined text-danger-500 !text-[32px]">error</i>
      </div>
      <h3 class="text-lg font-semibold text-black dark:text-white mb-2">
        Error Loading User
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
        {{ error }}
      </p>
      <div class="flex gap-3">
        <button
          @click="fetchUser"
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-colors"
        >
          Try Again
        </button>
        <RouterLink
          to="/users"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#15203c] hover:bg-gray-200 dark:hover:bg-[#1a2744] rounded-md transition-colors"
        >
          Back to List
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- User Details -->
  <div v-else-if="user" class="space-y-[25px]">
    <!-- Header Card with Actions -->
    <div class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">
      <!-- Action Buttons -->
      <div class="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100 dark:border-[#172036]">
        <RouterLink
          to="/users"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#15203c] hover:bg-gray-200 dark:hover:bg-[#1a2744] rounded-md transition-colors"
        >
          <i class="material-symbols-outlined !text-[18px]">arrow_back</i>
          Back to List
        </RouterLink>
        <RouterLink
          :to="`/users/${user._id}/edit`"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white rounded-md transition-colors"
        >
          <i class="material-symbols-outlined !text-[18px]">edit</i>
          Edit User
        </RouterLink>
      </div>

      <!-- User Header -->
      <div class="flex items-start justify-between mb-6">
        <div class="flex items-center gap-4">
          <!-- Avatar -->
          <div v-if="user.avatar" class="flex-shrink-0">
            <img
              :src="user.avatar"
              alt="Avatar"
              class="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-[#172036]"
            />
          </div>
          <div v-else class="flex-shrink-0">
            <div class="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-3xl border-2 border-gray-200 dark:border-[#172036]">
              {{ user.name.charAt(0).toUpperCase() }}
            </div>
          </div>

          <!-- User Info -->
          <div>
            <h2 class="text-2xl font-bold text-black dark:text-white mb-1">
              {{ user.name }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">
              @{{ user.username }}
            </p>
            <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span class="flex items-center gap-1">
                <i class="material-symbols-outlined !text-[18px]">email</i>
                {{ user.email }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2 items-end">
          <span
            :class="user.active
              ? 'px-[12px] py-[6px] inline-block bg-success-50 dark:bg-[#15203c] text-success-500 rounded-md font-medium text-sm'
              : 'px-[12px] py-[6px] inline-block bg-danger-50 dark:bg-[#15203c] text-danger-500 rounded-md font-medium text-sm'"
          >
            {{ user.active ? 'Active' : 'Inactive' }}
          </span>
          <span :class="getRoleBadgeClass(user.role)" class="px-[12px] py-[6px] inline-block rounded-md font-medium text-sm capitalize">
            {{ user.role }}
          </span>
        </div>
      </div>

      <!-- User Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Full Name -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Full Name
          </label>
          <p class="text-base text-black dark:text-white bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ user.name }}
          </p>
        </div>

        <!-- Username -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Username
          </label>
          <p class="text-base text-black dark:text-white bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ user.username }}
          </p>
        </div>

        <!-- Email -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Email Address
          </label>
          <p class="text-base text-black dark:text-white bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ user.email }}
          </p>
        </div>

        <!-- Role -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Role
          </label>
          <p class="text-base text-black dark:text-white bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md capitalize">
            {{ user.role }}
          </p>
        </div>
      </div>
    </div>

    <!-- Staff Information (if applicable) -->
    <div v-if="user.staff" class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">
      <h4 class="text-lg font-semibold text-black dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-[#172036]">
        Associated Staff Information
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Staff Name (English) -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Staff Name (English)
          </label>
          <RouterLink
            :to="`/staff/${staff._id}`"
            class="block text-base text-primary-500 hover:text-primary-600 bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md transition-colors"
          >
            {{ staff.name_en }}
          </RouterLink>
        </div>

        <!-- Staff Name (Khmer) -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Staff Name (Khmer)
          </label>
          <p class="text-base text-black dark:text-white bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ staff.name_kh }}
          </p>
        </div>

        <!-- Position -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Position
          </label>
          <p class="text-base text-black dark:text-white bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ staff.position }}
          </p>
        </div>

        <!-- Gender -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Gender
          </label>
          <p class="text-base text-black dark:text-white bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md capitalize">
            {{ staff.gender }}
          </p>
        </div>

        <!-- Staff Description (Full Width) -->
        <div class="space-y-1 md:col-span-2">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Staff Description
          </label>
          <p class="text-sm text-black dark:text-white leading-relaxed bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ staff.description || 'No description available' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Additional Information -->
<!--    <div class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">-->
<!--      <h4 class="text-lg font-semibold text-black dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-[#172036]">-->
<!--        Additional Information-->
<!--      </h4>-->

<!--      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">-->
<!--        &lt;!&ndash; Created At &ndash;&gt;-->
<!--        <div class="space-y-1">-->
<!--          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">-->
<!--            Created Date-->
<!--          </label>-->
<!--          <p class="text-sm text-black dark:text-white bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">-->
<!--            {{ formatDateTime(user.createdAt) }}-->
<!--          </p>-->
<!--        </div>-->

<!--        &lt;!&ndash; Updated At &ndash;&gt;-->
<!--        <div class="space-y-1">-->
<!--          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">-->
<!--            Last Updated-->
<!--          </label>-->
<!--          <p class="text-sm text-black dark:text-white bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">-->
<!--            {{ formatDateTime(user.updatedAt) }}-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PageTitle from "@/components/Common/PageTitle.vue";
import axios from 'axios';

// Types
interface Staff {
  _id: string;
  name_kh: string;
  name_en: string;
  gender: 'male' | 'female';
  position: string;
  description: string;
  active: boolean;
}

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  avatar?: string;
  staff?: Staff;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Router
const route = useRoute();

// State
const user = ref<User | null>(null);
const staff = ref<Staff | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Helper Functions
const formatDateTime = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getRoleBadgeClass = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'bg-danger-50 dark:bg-[#15203c] text-danger-500';
    case 'manager':
      return 'bg-warning-50 dark:bg-[#15203c] text-warning-500';
    case 'user':
      return 'bg-primary-50 dark:bg-[#15203c] text-primary-500';
    default:
      return 'bg-gray-50 dark:bg-[#15203c] text-gray-500';
  }
};

// Methods
const fetchUser = async () => {
  const userId = route.params.userId as string;

  if (!userId) {
    error.value = 'User ID is missing';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`,
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
    );
    user.value = data;
  } catch (err: any) {
    console.error('Failed to fetch user:', err);
    if (err.response?.status === 404) {
      error.value = 'User not found';
    } else if (err.response?.status === 400) {
      error.value = 'Invalid user ID';
    } else {
      error.value = 'Failed to load user details. Please try again later.';
    }
  } finally {
    const staff_id = user.value;
    if (staff_id.staff) {
      await fetchStaff();
    }
    isLoading.value = false;
  }
};

const fetchStaff = async () => {
  const staffId = user.value;

  if (!staffId) {
    error.value = 'Staff ID is missing';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/staff/${staffId.staff}`,
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
    );
    staff.value = data;
  } catch (err: any) {
    console.error('Failed to fetch staff:', err);
    if (err.response?.status === 404) {
      error.value = 'Staff not found';
    } else if (err.response?.status === 400) {
      error.value = 'Invalid staff ID';
    } else {
      error.value = 'Failed to load staff details. Please try again later.';
    }
  } finally {
    // isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
/* Add any custom styles if needed */
</style>