<template>
  <PageTitle pageTitle="Department Details" subTitle="Departments" />

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
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Loading department details...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="trezo-card bg-white dark:bg-[#0c1427] mb-[25px] p-[20px] md:p-[25px] rounded-md">
    <div class="flex flex-col items-center justify-center py-20">
      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-danger-50 dark:bg-danger-500/10 rounded-full mb-4">
        <i class="material-symbols-outlined text-danger-500 !text-[32px]">error</i>
      </div>
      <h3 class="text-lg font-semibold text-black dark:text-white mb-2">
        Error Loading Department
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
        {{ error }}
      </p>
      <div class="flex gap-3">
        <button
          @click="fetchDepartment"
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-colors"
        >
          Try Again
        </button>
        <RouterLink
          to="/departments"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#15203c] hover:bg-gray-200 dark:hover:bg-[#1a2744] rounded-md transition-colors"
        >
          Back to List
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- Department Details -->
  <div v-else-if="department" class="space-y-[25px]">
    <!-- Header Card with Actions -->
    <div class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-[#172036]">
        <RouterLink
            to="/departments"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#15203c] hover:bg-gray-200 dark:hover:bg-[#1a2744] rounded-md transition-colors"
        >
          <i class="material-symbols-outlined !text-[18px]">arrow_back</i>
          Back to List
        </RouterLink>
        <RouterLink
            :to="`/departments/${department._id}/edit`"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white rounded-md transition-colors"
        >
          <i class="material-symbols-outlined !text-[18px]">edit</i>
          Edit Department
        </RouterLink>
        <button
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-danger-500 border border-danger-500 hover:bg-danger-500 hover:text-white rounded-md transition-colors"
        >
          <i class="material-symbols-outlined !text-[18px]">delete</i>
          Delete
        </button>
      </div>

      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-2xl font-bold text-black dark:text-white mb-1">
            {{ department.name_en }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            {{ department.name_kh }}
          </p>
        </div>
        <div>
          <span
            :class="department.active
              ? 'px-[12px] py-[6px] inline-block bg-success-50 dark:bg-[#15203c] text-success-500 rounded-md font-medium text-sm'
              : 'px-[12px] py-[6px] inline-block bg-danger-50 dark:bg-[#15203c] text-danger-500 rounded-md font-medium text-sm'"
          >
            {{ department.active ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </div>
      <!-- Description (Full Width) -->
      <div class="space-y-1 md:col-span-2">
        <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Description
        </label>
        <p class="text-sm text-black dark:text-white leading-relaxed bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
          {{ department.description || 'No description available' }}
        </p>
      </div>


    </div>

    <!-- Department Information Card -->
    <div class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">
      <h3 class="text-lg font-semibold text-black dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-[#172036]">
        Department Information
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Department ID -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Department ID
          </label>
          <p class="text-sm text-black dark:text-white font-mono bg-gray-50 dark:bg-[#15203c] px-3 py-2 rounded-md">
            {{ department._id }}
          </p>
        </div>

        <!-- Status -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Status
          </label>
          <p class="text-sm text-black dark:text-white">
            <span
              :class="department.active
                ? 'px-[8px] py-[3px] inline-block bg-success-50 dark:bg-[#15203c] text-success-500 rounded-sm font-medium'
                : 'px-[8px] py-[3px] inline-block bg-danger-50 dark:bg-[#15203c] text-danger-500 rounded-sm font-medium'"
            >
              {{ department.active ? 'Active' : 'Inactive' }}
            </span>
          </p>
        </div>

        <!-- Department Name (English) -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Department Name (English)
          </label>
          <p class="text-sm text-black dark:text-white font-medium">
            {{ department.name_en }}
          </p>
        </div>

        <!-- Department Name (Khmer) -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Department Name (Khmer)
          </label>
          <p class="text-sm text-black dark:text-white font-medium">
            {{ department.name_kh }}
          </p>
        </div>

        <!-- Description (Full Width) -->
        <div class="space-y-1 md:col-span-2">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Description
          </label>
          <p class="text-sm text-black dark:text-white leading-relaxed bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ department.description || 'No description available' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Additional Information Card (if needed for future expansion) -->
    <div class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">
      <h3 class="text-lg font-semibold text-black dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-[#172036]">
        Statistics
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Total Staff -->
        <div class="bg-gray-50 dark:bg-[#15203c] p-4 rounded-md">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-primary-50 dark:bg-primary-500/10 rounded-full flex items-center justify-center">
              <i class="material-symbols-outlined text-primary-500 !text-[24px]">group</i>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Staff</p>
              <p class="text-2xl font-bold text-black dark:text-white">0</p>
            </div>
          </div>
        </div>

        <!-- Active Events -->
        <div class="bg-gray-50 dark:bg-[#15203c] p-4 rounded-md">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-success-50 dark:bg-success-500/10 rounded-full flex items-center justify-center">
              <i class="material-symbols-outlined text-success-500 !text-[24px]">event</i>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Active Events</p>
              <p class="text-2xl font-bold text-black dark:text-white">0</p>
            </div>
          </div>
        </div>

        <!-- Total Meetings -->
        <div class="bg-gray-50 dark:bg-[#15203c] p-4 rounded-md">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-warning-50 dark:bg-warning-500/10 rounded-full flex items-center justify-center">
              <i class="material-symbols-outlined text-warning-500 !text-[24px]">meeting_room</i>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Meetings</p>
              <p class="text-2xl font-bold text-black dark:text-white">0</p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
        Statistics feature coming soon...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTitle from "@/components/Common/PageTitle.vue";
import axios from 'axios';

// Types
interface Department {
  _id: string;
  name_kh: string;
  name_en: string;
  description: string;
  active: boolean;
}

// Router
const route = useRoute();
const router = useRouter();

// State
const department = ref<Department | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Methods
const fetchDepartment = async () => {
  const departmentId = route.params.departmentId as string;

  if (!departmentId) {
    error.value = 'Department ID is missing';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/departments/${departmentId}`);
    department.value = data;
  } catch (err: any) {
    console.error('Failed to fetch department:', err);
    if (err.response?.status === 404) {
      error.value = 'Department not found';
    } else if (err.response?.status === 400) {
      error.value = 'Invalid department ID';
    } else {
      error.value = 'Failed to load department details. Please try again later.';
    }
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchDepartment();
});
</script>