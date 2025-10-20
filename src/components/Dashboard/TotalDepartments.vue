<template>
  <div class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[30px] rounded-md">
    <div class="trezo-card-content relative">
      <div class="flex items-center gap-[12px]">
        <div
          class="bg-purple-600 rounded-[4px] text-white w-[44px] h-[44px] flex items-center justify-center"
        >
          <i class="material-symbols-outlined">apartment</i>
        </div>
        <div>
          <span class="block">Total Departments</span>
          <h5 class="!mb-0 mt-[2px] !text-[20px] !font-semibold">
            {{ isLoading ? '...' : totalCount }}
          </h5>
        </div>
      </div>
      <div class="mt-[32px] flex items-center gap-[7px]">
        <div
          class="bg-purple-100 dark:bg-[#15203c] text-purple-700 rounded-[4px] w-[26px] h-[26px] flex items-center justify-center text-lg"
        >
          <i class="material-symbols-outlined !text-[16px]">dashboard</i>
        </div>
        <div class="text-gray-600 dark:text-gray-400">
          <span class="font-medium text-gray-700 dark:text-gray-400">Active</span>
          departments
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalCount: number;
  isLoading: boolean;
}>();
</script>