<template>
  <PageTitle pageTitle="Departments List" subTitle="Departments" />
  <div
      class="trezo-card bg-white dark:bg-[#0c1427] mb-[25px] p-[20px] md:p-[25px] rounded-md"
  >
    <div
        class="trezo-card-header mb-[20px] md:mb-[25px] sm:flex items-center justify-between"
    >
      <div class="trezo-card-title flex items-center gap-3">
        <form class="relative sm:w-[265px]">
          <label
              class="leading-none absolute ltr:left-[13px] rtl:right-[13px] text-black dark:text-white mt-px top-1/2 -translate-y-1/2"
          >
            <i class="material-symbols-outlined !text-[20px]"> search </i>
          </label>
          <input
              type="text"
              v-model="searchQuery"
              placeholder="Search department..."
              class="bg-gray-50 border border-gray-50 h-[36px] text-xs rounded-md w-full block text-black pt-[11px] pb-[12px] ltr:pl-[38px] rtl:pr-[38px] ltr:pr-[13px] ltr:md:pr-[16px] rtl:pl-[13px] rtl:md:pl-[16px] placeholder:text-gray-500 outline-0 dark:bg-[#15203c] dark:text-white dark:border-[#15203c] dark:placeholder:text-gray-400"
          />
        </form>

        <div class="flex items-center gap-2">
          <label class="text-xs text-black dark:text-white whitespace-nowrap">Show:</label>
          <select
              v-model="limit"
              @change="onLimitChange"
              class="bg-gray-50 border border-gray-50 h-[36px] text-xs rounded-md text-black px-[10px] outline-0 dark:bg-[#15203c] dark:text-white dark:border-[#15203c] cursor-pointer"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
      </div>

      <div class="trezo-card-subtitle mt-[15px] sm:mt-0">
        <RouterLink
            to="/events/create-an-event"
            class="inline-block transition-all rounded-md font-medium px-[13px] py-[6px] text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white"
        >
          <span class="inline-block relative ltr:pl-[22px] rtl:pr-[22px]">
            <i
                class="material-symbols-outlined !text-[22px] absolute ltr:-left-[4px] rtl:-right-[4px] top-1/2 -translate-y-1/2"
            >
              add
            </i>
            Add New Department
          </span>
        </RouterLink>
      </div>
    </div>

    <div class="trezo-card-content relative">
      <!-- Loading Overlay -->
      <div v-if="isLoading" class="absolute inset-0 bg-white dark:bg-[#0c1427] bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-10 rounded-md">
        <div class="flex flex-col items-center gap-3">
<!--          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>-->

          <div role="status">
            <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading departments...</p>
        </div>
      </div>

      <div class="table-responsive overflow-x-auto">
        <table class="w-full">
          <thead class="text-black dark:text-white">
          <tr>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              ID
            </th>
            <th
                @click="handleSort('name_kh')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Department (KH)</span>
                <i v-if="sortBy === 'name_kh'" class="material-symbols-outlined !text-[18px]">
                  {{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                </i>
                <i v-else class="material-symbols-outlined !text-[18px] opacity-30">
                  unfold_more
                </i>
              </div>
            </th>
            <th
                @click="handleSort('name_en')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Department (EN)</span>
                <i v-if="sortBy === 'name_en'" class="material-symbols-outlined !text-[18px]">
                  {{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                </i>
                <i v-else class="material-symbols-outlined !text-[18px] opacity-30">
                  unfold_more
                </i>
              </div>
            </th>
            <th
                @click="handleSort('description')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Description</span>
                <i v-if="sortBy === 'description'" class="material-symbols-outlined !text-[18px]">
                  {{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                </i>
                <i v-else class="material-symbols-outlined !text-[18px] opacity-30">
                  unfold_more
                </i>
              </div>
            </th>
            <th
                @click="handleSort('active')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Status</span>
                <i v-if="sortBy === 'active'" class="material-symbols-outlined !text-[18px]">
                  {{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                </i>
                <i v-else class="material-symbols-outlined !text-[18px] opacity-30">
                  unfold_more
                </i>
              </div>
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Action
            </th>
          </tr>
          </thead>
          <tbody class="text-black dark:text-white">
          <tr v-for="(department, index) in departments" :key="department._id">
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ (pagination.page - 1) * limit + index + 1 }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <RouterLink
                  to="/events/event-details"
                  class="flex items-center text-black dark:text-white transition-all hover:text-primary-500"
              >
                <span
                    class="block text-[15px] font-medium ltr:ml-[12px] rtl:mr-[12px]"
                >
                   {{department.name_kh}}
                  </span>
              </RouterLink>
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{department.name_en}}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{department.description.substring(0,30) + "..."}}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
                <span
                    :class=" department.active?
                    'px-[8px] py-[3px] inline-block bg-success-50 dark:bg-[#15203c] text-success-500 rounded-sm font-medium text-xs'
                    : 'px-[8px] py-[3px] inline-block bg-danger-50 dark:bg-[#15203c] text-danger-500 rounded-sm font-medium text-xs' "
                >
                  {{department.active? "Active":"Inactive"}}
                </span>
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <div class="flex items-center gap-[9px]">
                <button
                    type="button"
                    class="text-primary-500 leading-none custom-tooltip"
                    v-tooltip="'View'"
                >
                  <i class="material-symbols-outlined !text-md">
                    visibility
                  </i>
                </button>
                <button
                    type="button"
                    class="text-gray-500 dark:text-gray-400 leading-none custom-tooltip"
                    v-tooltip="'Edit'"
                >
                  <i class="material-symbols-outlined !text-md"> edit </i>
                </button>
                <button
                    type="button"
                    @click="confirmDelete(department)"
                    class="text-danger-500 leading-none custom-tooltip"
                    v-tooltip="'Delete'"
                >
                  <i class="material-symbols-outlined !text-md"> delete </i>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <Pagination
          :items="displayedItemsRange"
          :total="totalDocs"
          :current-page="pagination.page"
          :total-pages="pagination.totalPages"
          :has-next-page="pagination.hasNextPage"
          :has-prev-page="pagination.hasPrevPage"
          @first="goToFirstPage"
          @prev="prevPage"
          @next="nextPage"
          @last="goToLastPage"
          @page-change="goToPage"
          class="px-[20px] py-[12px] md:py-[14px] rounded-b-md border-l border-r border-b border-gray-100 dark:border-[#172036]"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Semi-transparent backdrop -->
      <div @click="cancelDelete" class="absolute inset-0 bg-black/50 dark:bg-black/70"></div>

      <!-- Modal content -->
      <div class="relative bg-white dark:bg-[#0c1427] rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 mx-auto bg-danger-50 dark:bg-danger-500/10 rounded-full mb-4">
            <i class="material-symbols-outlined text-danger-500 !text-[24px]">warning</i>
          </div>

          <h3 class="text-lg font-semibold text-center text-black dark:text-white mb-2">
            Delete Department
          </h3>

          <p class="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete "<strong>{{ departmentToDelete?.name_en }}</strong>"? This action cannot be undone.
          </p>

          <div class="flex gap-3 justify-end">
            <button
                @click="cancelDelete"
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#15203c] hover:bg-gray-200 dark:hover:bg-[#1a2744] rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
                @click="deleteDepartment"
                type="button"
                class="px-4 py-2 text-sm font-medium text-white bg-danger-500 hover:bg-danger-600 rounded-md transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast Notification -->
    <Transition
        enter-active-class="transition ease-out duration-300 transform"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-2 opacity-0"
    >
      <div
          v-if="showToast"
          class="fixed top-5 right-5 z-[60] max-w-md w-full sm:w-auto"
      >
        <div class="bg-white dark:bg-[#0c1427] rounded-lg shadow-2xl border border-success-500 overflow-hidden">
          <div class="flex items-start p-4 gap-3">
            <!-- Success Icon -->
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-success-50 dark:bg-success-500/10">
                <i class="material-symbols-outlined text-success-500 !text-[24px]">check_circle</i>
              </div>
            </div>

            <!-- Message Content -->
            <div class="flex-1 pt-0.5">
              <h4 class="text-sm font-semibold text-black dark:text-white mb-1">
                Success!
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ toastMessage }}
              </p>
            </div>

            <!-- Close Button -->
            <button
                @click="showToast = false"
                type="button"
                class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <i class="material-symbols-outlined !text-[20px]">close</i>
            </button>
          </div>

          <!-- Progress Bar -->
          <div class="h-1 bg-gray-100 dark:bg-[#15203c]">
            <div class="h-full bg-success-500 animate-toast-progress"></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import PageTitle from "@/components/Common/PageTitle.vue";
import axios from 'axios';
import Pagination from "@/components/Common/Pagination.vue";

// Types
interface Department {
  _id: string;
  name_kh: string;
  name_en: string;
  description: string;
  active: boolean;
}

interface PaginationData {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Reactive state
const departments = ref<Department[]>([]);
const page = ref(1);
const limit = ref(10);
const totalDocs = ref(0);
const searchQuery = ref('');
const sortBy = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');
const isLoading = ref(false);
const showDeleteModal = ref(false);
const departmentToDelete = ref<Department | null>(null);
const showToast = ref(false);
const toastMessage = ref('');
const pagination = reactive<PaginationData>({
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false
});

// Computed properties
const displayedItemsRange = computed(() => {
  const start = (pagination.page - 1) * limit.value + 1;
  const end = Math.min(pagination.page * limit.value, totalDocs.value);
  return `${start}-${end}`;
});

// Methods
const fetchDepartments = async () => {
  // const token = localStorage.getItem('token')
  isLoading.value = true;
  try {
    const params: any = {
      page: page.value,
      limit: limit.value
    };

    // Add search parameter if searchQuery is not empty
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim();
    }

    // Add sort parameters if sorting is active
    if (sortBy.value) {
      params.sortBy = sortBy.value;
      params.sortOrder = sortOrder.value;
    }

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/departments`, {
      params,
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    });

    departments.value = data.docs;
    totalDocs.value = data.totalDocs;
    console.log(departments.value);
    pagination.page = data.page;
    pagination.totalPages = data.totalPages;
    pagination.hasNextPage = data.hasNextPage;
    pagination.hasPrevPage = data.hasPrevPage;
  } catch (error) {
    console.error('Failed to fetch department:', error);
  } finally {
    isLoading.value = false;
  }
};

const goToFirstPage = () => {
  page.value = 1;
  fetchDepartments();
};

const prevPage = () => {
  if (pagination.hasPrevPage) {
    page.value--;
    fetchDepartments();
  }
};

const nextPage = () => {
  if (pagination.hasNextPage) {
    page.value++;
    fetchDepartments();
  }
};

const goToLastPage = () => {
  page.value = pagination.totalPages;
  fetchDepartments();
};

const goToPage = (pageNum: number) => {
  page.value = pageNum;
  fetchDepartments();
};

const onLimitChange = () => {
  page.value = 1; // reset page
  fetchDepartments();
};

const handleSort = (field: string) => {
  if (sortBy.value === field) {
    // Toggle sort order if clicking the same field
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    // Set new field and default to ascending
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
  page.value = 1; // Reset to first page when sorting
  fetchDepartments();
};

const confirmDelete = (department: Department) => {
  departmentToDelete.value = department;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  departmentToDelete.value = null;
};

const deleteDepartment = async () => {
  if (!departmentToDelete.value) return;

  const deletedDepartmentName = departmentToDelete.value.name_en;

  // const token = localStorage.getItem('token')
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/departments/${departmentToDelete.value._id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    });

    // Close modal
    showDeleteModal.value = false;
    departmentToDelete.value = null;

    // Show success toast
    toastMessage.value = `Department "${deletedDepartmentName}" has been deleted successfully.`;
    showToast.value = true;

    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      showToast.value = false;
    }, 4000);

    // Refresh the list
    await fetchDepartments();
  } catch (error) {
    console.error('Failed to delete department:', error);
    alert('Failed to delete department. Please try again.');
  }
};

// Watch for search query changes with debounce
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    page.value = 1; // Reset to first page when searching
    fetchDepartments();
  }, 500); // 500ms debounce delay
});

// Lifecycle hooks
onMounted(() => {
  fetchDepartments();
});
</script>

<style scoped>
@keyframes toast-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.animate-toast-progress {
  animation: toast-progress 4s linear forwards;
}
</style>
