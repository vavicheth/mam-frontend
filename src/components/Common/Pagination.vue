<template>
  <div class="pt-[12px] md:pt-[14px] sm:flex sm:items-center justify-between">
    <p class="!mb-0 text-sm">Showing {{ items }} of {{ total }} results</p>
    <ol class="mt-[10px] sm:mt-0">
      <!-- First Button -->
      <li
        class="inline-block mx-[3px] ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0"
      >
        <button
          @click="$emit('first')"
          :disabled="currentPage === 1"
          :class="[
            'h-[31px] px-[10px] block leading-[29px] relative text-center rounded-md border transition-all text-xs font-medium',
            currentPage !== 1
              ? 'border-gray-100 dark:border-[#172036] hover:bg-primary-500 hover:text-white hover:border-primary-500 cursor-pointer'
              : 'border-gray-100 dark:border-[#172036] opacity-50 cursor-not-allowed'
          ]"
        >
          <span class="opacity-0"> 0 </span>
          <i
              class="material-symbols-outlined left-0 right-0 absolute top-1/2 -translate-y-1/2"
          >
            first_page
          </i>
        </button>
      </li>

      <!-- Previous Button -->
      <li
        class="inline-block mx-[3px] ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0"
      >
        <button
          @click="$emit('prev')"
          :disabled="!hasPrevPage"
          :class="[
            'w-[31px] h-[31px] block leading-[29px] relative text-center rounded-md border transition-all',
            hasPrevPage
              ? 'border-gray-100 dark:border-[#172036] hover:bg-primary-500 hover:text-white hover:border-primary-500 cursor-pointer'
              : 'border-gray-100 dark:border-[#172036] opacity-50 cursor-not-allowed'
          ]"
        >
          <span class="opacity-0"> 0 </span>
          <i
            class="material-symbols-outlined left-0 right-0 absolute top-1/2 -translate-y-1/2"
          >
            chevron_left
          </i>
        </button>
      </li>

      <!-- Page Numbers -->
      <li
        v-for="pageNum in displayPages"
        :key="pageNum"
        class="inline-block mx-[3px] ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0"
      >
        <button
          @click="$emit('page-change', pageNum)"
          :class="[
            'w-[31px] h-[31px] block leading-[29px] relative text-center rounded-md border transition-all',
            pageNum === currentPage
              ? 'border-primary-500 bg-primary-500 text-white'
              : 'border-gray-100 dark:border-[#172036] hover:bg-primary-500 hover:text-white hover:border-primary-500'
          ]"
        >
          {{ pageNum }}
        </button>
      </li>

      <!-- Next Button -->
      <li
        class="inline-block mx-[3px] ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0"
      >
        <button
          @click="$emit('next')"
          :disabled="!hasNextPage"
          :class="[
            'w-[31px] h-[31px] block leading-[29px] relative text-center rounded-md border transition-all',
            hasNextPage
              ? 'border-gray-100 dark:border-[#172036] hover:bg-primary-500 hover:text-white hover:border-primary-500 cursor-pointer'
              : 'border-gray-100 dark:border-[#172036] opacity-50 cursor-not-allowed'
          ]"
        >
          <span class="opacity-0"> 0 </span>
          <i
            class="material-symbols-outlined left-0 right-0 absolute top-1/2 -translate-y-1/2"
          >
            chevron_right
          </i>
        </button>
      </li>

      <!-- Last Button -->
      <li
        class="inline-block mx-[3px] ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0"
      >
        <button
          @click="$emit('last')"
          :disabled="currentPage === totalPages"
          :class="[
            'h-[31px] px-[10px] block leading-[29px] relative text-center rounded-md border transition-all text-xs font-medium',
            currentPage !== totalPages
              ? 'border-gray-100 dark:border-[#172036] hover:bg-primary-500 hover:text-white hover:border-primary-500 cursor-pointer'
              : 'border-gray-100 dark:border-[#172036] opacity-50 cursor-not-allowed'
          ]"
        >
          <span class="opacity-0"> 0 </span>
          <i
              class="material-symbols-outlined left-0 right-0 absolute top-1/2 -translate-y-1/2"
          >
            last_page
          </i>
        </button>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Props
interface Props {
  items: number | string;
  total: number | string;
  currentPage?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
});

// Emits
defineEmits<{
  first: [];
  prev: [];
  next: [];
  last: [];
  'page-change': [page: number];
}>();

// Computed
const displayPages = computed(() => {
  const pages: number[] = [];
  const maxDisplayPages = 3;

  if (props.totalPages <= maxDisplayPages) {
    // Show all pages if total is less than max
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show current page and surrounding pages
    let start = Math.max(1, props.currentPage - 1);
    let end = Math.min(props.totalPages, props.currentPage + 1);

    // Adjust if at the beginning
    if (props.currentPage === 1) {
      end = Math.min(maxDisplayPages, props.totalPages);
    }

    // Adjust if at the end
    if (props.currentPage === props.totalPages) {
      start = Math.max(1, props.totalPages - maxDisplayPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return pages;
});
</script>
