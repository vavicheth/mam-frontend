<template>
  <PageTitle pageTitle="Events List" subTitle="Events" />

  <!-- Add New Event Popup -->
  <div
      :class="[
      'add-new-popup z-[999] fixed transition-all inset-0 overflow-x-hidden overflow-y-auto lg:py-[20px]',
      { active: showNewModal },
    ]"
  >
    <div
        class="popup-dialog flex transition-all max-w-[650px] min-h-full items-center mx-auto"
    >
      <div
          class="trezo-card w-full bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md"
      >
        <div
            class="trezo-card-header bg-gray-50 dark:bg-[#15203c] mb-[20px] md:mb-[25px] flex items-center justify-between -mx-[20px] md:-mx-[25px] -mt-[20px] md:-mt-[25px] p-[20px] md:p-[25px] rounded-t-md"
        >
          <div class="trezo-card-title">
            <h5 class="!mb-0">Add New Event</h5>
          </div>
          <div class="trezo-card-subtitle">
            <button
                type="button"
                class="text-[23px] transition-all leading-none text-black dark:text-white hover:text-primary-500"
                @click="closeNewModal"
            >
              <i class="ri-close-fill"></i>
            </button>
          </div>
        </div>
        <div class="trezo-card-content">
          <form>
            <div class="sm:grid sm:grid-cols-2 sm:gap-[25px]">
              <div class="sm:col-span-2 mb-[20px] sm:mb-0">
                <label
                    class="mb-[10px] text-black dark:text-white font-medium block"
                >
                  Title <span class="text-danger-500">*</span>
                </label>
                <input
                    v-model="formData.title"
                    type="text"
                    :class="[
                      'h-[55px] rounded-md text-black dark:text-white border bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400',
                      formErrors.title ? 'border-danger-500 focus:border-danger-500' : 'border-gray-200 dark:border-[#172036] focus:border-primary-500'
                    ]"
                    placeholder="Event title"
                />
                <p v-if="formErrors.title" class="text-danger-500 text-sm mt-1">{{ formErrors.title }}</p>
              </div>

              <div class="mb-[20px] sm:mb-0">
                <label
                    class="mb-[10px] text-black dark:text-white font-medium block"
                >
                  Start Date <span class="text-danger-500">*</span>
                </label>
                <input
                    v-model="formData.start_date"
                    type="datetime-local"
                    :class="[
                      'h-[55px] rounded-md text-black dark:text-white border bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400',
                      formErrors.start_date ? 'border-danger-500 focus:border-danger-500' : 'border-gray-200 dark:border-[#172036] focus:border-primary-500'
                    ]"
                />
                <p v-if="formErrors.start_date" class="text-danger-500 text-sm mt-1">{{ formErrors.start_date }}</p>
              </div>

              <div class="mb-[20px] sm:mb-0">
                <label
                    class="mb-[10px] text-black dark:text-white font-medium block"
                >
                  End Date <span class="text-danger-500">*</span>
                </label>
                <input
                    v-model="formData.end_date"
                    type="datetime-local"
                    :class="[
                      'h-[55px] rounded-md text-black dark:text-white border bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400',
                      formErrors.end_date ? 'border-danger-500 focus:border-danger-500' : 'border-gray-200 dark:border-[#172036] focus:border-primary-500'
                    ]"
                />
                <p v-if="formErrors.end_date" class="text-danger-500 text-sm mt-1">{{ formErrors.end_date }}</p>
              </div>

              <div class="sm:col-span-2 mb-[20px] sm:mb-0">
                <label
                    class="mb-[10px] text-black dark:text-white font-medium block"
                >
                  Description
                </label>
                <textarea
                    v-model="formData.description"
                    class="min-h-[100px] rounded-md text-black dark:text-white border border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] px-[17px] py-[15px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500"
                    placeholder="Enter event description"
                />
              </div>

              <div class="sm:col-span-2 mb-[20px] sm:mb-0">
                <label
                    class="mb-[10px] text-black dark:text-white font-medium block"
                >
                  Event Link
                </label>
                <input
                    v-model="formData.event_link"
                    type="url"
                    class="h-[55px] rounded-md text-black dark:text-white border border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500"
                    placeholder="https://example.com/event"
                />
              </div>

              <div class="mb-[20px] sm:mb-0">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                      v-model="formData.allow_guest"
                      type="checkbox"
                      class="w-4 h-4 text-primary-500 focus:ring-primary-500 focus:ring-2 rounded"
                  />
                  <span class="text-sm text-black dark:text-white font-medium">Allow Guest Attendance</span>
                </label>
              </div>
            </div>

            <div class="mt-[20px] md:mt-[25px] ltr:text-right rtl:text-left">
              <button
                  type="button"
                  class="rounded-md inline-block transition-all font-medium ltr:mr-[15px] rtl:ml-[15px] px-[26.5px] py-[12px] bg-danger-500 text-white hover:bg-danger-400"
                  @click="closeNewModal"
              >
                Cancel
              </button>
              <button
                  type="button"
                  @click="createEvent"
                  :disabled="isCreating"
                  class="inline-block bg-primary-500 text-white py-[12px] px-[26.5px] transition-all rounded-md hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isCreating" class="inline-block relative ltr:pl-[25px] rtl:pr-[25px]">
                  <i
                      class="material-symbols-outlined !text-[20px] absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2"
                  >
                    add
                  </i>
                  Create
                </span>
                <span v-else class="inline-block">
                  Creating...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

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
              placeholder="Search event..."
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
        <button
            @click="openNewModal"
            class="inline-block transition-all rounded-md font-medium px-[13px] py-[6px] text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white"
        >
          <span class="inline-block relative ltr:pl-[22px] rtl:pr-[22px]">
            <i
                class="material-symbols-outlined !text-[22px] absolute ltr:-left-[4px] rtl:-right-[4px] top-1/2 -translate-y-1/2"
            >
              add
            </i>
            Add New Event
          </span>
        </button>
      </div>
    </div>

    <div class="trezo-card-content relative">
      <!-- Loading Overlay -->
      <div v-if="isLoading" class="absolute inset-0 bg-white dark:bg-[#0c1427] bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-10 rounded-md">
        <div class="flex flex-col items-center gap-3">
          <div role="status">
            <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading events...</p>
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
                @click="handleSort('title')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Title</span>
                <i v-if="sortBy === 'title'" class="material-symbols-outlined !text-[18px]">
                  {{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                </i>
                <i v-else class="material-symbols-outlined !text-[18px] opacity-30">
                  unfold_more
                </i>
              </div>
            </th>
            <th
                @click="handleSort('start_date')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Start Date</span>
                <i v-if="sortBy === 'start_date'" class="material-symbols-outlined !text-[18px]">
                  {{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                </i>
                <i v-else class="material-symbols-outlined !text-[18px] opacity-30">
                  unfold_more
                </i>
              </div>
            </th>
            <th
                @click="handleSort('end_date')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>End Date</span>
                <i v-if="sortBy === 'end_date'" class="material-symbols-outlined !text-[18px]">
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
              Allow Guest
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Staff Count
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Action
            </th>
          </tr>
          </thead>
          <tbody class="text-black dark:text-white">
          <tr v-for="(event, index) in events" :key="event._id">
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ (pagination.page - 1) * limit + index + 1 }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <RouterLink
                  :to="`/events/${event._id}`"
                  class="flex items-center text-black dark:text-white transition-all hover:text-primary-500"
              >
                <span class="block text-[15px] font-medium">
                  {{ event.title }}
                </span>
              </RouterLink>
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ formatDateTime(event.start_date) }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ formatDateTime(event.end_date) }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <span
                  :class="event.allow_guest ?
                    'px-[8px] py-[3px] inline-block bg-success-50 dark:bg-[#15203c] text-success-500 rounded-sm font-medium text-xs'
                    : 'px-[8px] py-[3px] inline-block bg-gray-50 dark:bg-[#15203c] text-gray-500 rounded-sm font-medium text-xs'"
              >
                {{ event.allow_guest ? "Yes" : "No" }}
              </span>
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <span class="px-[8px] py-[3px] inline-block bg-primary-50 dark:bg-[#15203c] text-primary-500 rounded-sm font-medium text-xs">
                {{ event.event_staff?.length || 0 }} Staff
              </span>
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <div class="flex items-center gap-[9px]">
                <RouterLink
                    :to="`/events/${event._id}`"
                    class="text-primary-500 leading-none custom-tooltip"
                    v-tooltip="'View'"
                >
                  <i class="material-symbols-outlined !text-md">
                    visibility
                  </i>
                </RouterLink>
                <RouterLink
                    :to="`/events/${event._id}/edit`"
                    class="text-gray-500 dark:text-gray-400 leading-none custom-tooltip hover:text-primary-500 transition-colors"
                    v-tooltip="'Edit'"
                >
                  <i class="material-symbols-outlined !text-md"> edit </i>
                </RouterLink>
                <button
                    type="button"
                    @click="confirmDelete(event)"
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
            Delete Event
          </h3>

          <p class="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete "<strong>{{ eventToDelete?.title }}</strong>"? This action cannot be undone.
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
                @click="deleteEvent"
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
interface EventStaff {
  staff: string;
  is_join: boolean;
}

interface Event {
  _id: string;
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  allow_guest: boolean;
  event_link: string;
  qr_code?: string;
  event_staff: EventStaff[];
}

interface PaginationData {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Reactive state
const events = ref<Event[]>([]);
const page = ref(1);
const limit = ref(10);
const totalDocs = ref(0);
const searchQuery = ref('');
const sortBy = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');
const isLoading = ref(false);
const showDeleteModal = ref(false);
const eventToDelete = ref<Event | null>(null);
const showToast = ref(false);
const toastMessage = ref('');
const pagination = reactive<PaginationData>({
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false
});

// Form data for new event
const formData = ref({
  title: '',
  start_date: '',
  end_date: '',
  description: '',
  allow_guest: false,
  event_link: ''
});

// Add new modal
const showNewModal = ref(false);
const isCreating = ref(false);
const formErrors = ref({
  title: '',
  start_date: '',
  end_date: ''
});

const resetForm = () => {
  formData.value = {
    title: '',
    start_date: '',
    end_date: '',
    description: '',
    allow_guest: false,
    event_link: ''
  };
  formErrors.value = {
    title: '',
    start_date: '',
    end_date: ''
  };
};

const openNewModal = () => {
  resetForm();
  showNewModal.value = true;
};

const closeNewModal = () => {
  showNewModal.value = false;
  resetForm();
};

const validateForm = (): boolean => {
  let isValid = true;
  formErrors.value = {
    title: '',
    start_date: '',
    end_date: ''
  };

  if (!formData.value.title.trim()) {
    formErrors.value.title = 'Title is required';
    isValid = false;
  }

  if (!formData.value.start_date) {
    formErrors.value.start_date = 'Start date is required';
    isValid = false;
  }

  if (!formData.value.end_date) {
    formErrors.value.end_date = 'End date is required';
    isValid = false;
  }

  if (formData.value.start_date && formData.value.end_date) {
    if (new Date(formData.value.start_date) >= new Date(formData.value.end_date)) {
      formErrors.value.end_date = 'End date must be after start date';
      isValid = false;
    }
  }

  return isValid;
};

const createEvent = async () => {
  if (!validateForm()) {
    return;
  }

  isCreating.value = true;

  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/events`, {
      title: formData.value.title.trim(),
      start_date: formData.value.start_date,
      end_date: formData.value.end_date,
      description: formData.value.description.trim(),
      allow_guest: formData.value.allow_guest,
      event_link: formData.value.event_link.trim(),
      event_staff: []
    });

    // Close modal
    closeNewModal();

    // Show success toast
    toastMessage.value = `Event "${formData.value.title}" has been created successfully.`;
    showToast.value = true;

    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      showToast.value = false;
    }, 4000);

    // Refresh the list
    await fetchEvents();
  } catch (error: any) {
    console.error('Failed to create event:', error);
    const errorMsg = error.response?.data?.message || 'Failed to create event. Please try again.';
    alert(errorMsg);
  } finally {
    isCreating.value = false;
  }
};

// Computed properties
const displayedItemsRange = computed(() => {
  const start = (pagination.page - 1) * limit.value + 1;
  const end = Math.min(pagination.page * limit.value, totalDocs.value);
  return `${start}-${end}`;
});

// Utility function to format date and time
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Methods
const fetchEvents = async () => {
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

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/events`, {
      params
    });

    events.value = data.docs;
    totalDocs.value = data.totalDocs;
    pagination.page = data.page;
    pagination.totalPages = data.totalPages;
    pagination.hasNextPage = data.hasNextPage;
    pagination.hasPrevPage = data.hasPrevPage;
  } catch (error) {
    console.error('Failed to fetch events:', error);
  } finally {
    isLoading.value = false;
  }
};

const goToFirstPage = () => {
  page.value = 1;
  fetchEvents();
};

const prevPage = () => {
  if (pagination.hasPrevPage) {
    page.value--;
    fetchEvents();
  }
};

const nextPage = () => {
  if (pagination.hasNextPage) {
    page.value++;
    fetchEvents();
  }
};

const goToLastPage = () => {
  page.value = pagination.totalPages;
  fetchEvents();
};

const goToPage = (pageNum: number) => {
  page.value = pageNum;
  fetchEvents();
};

const onLimitChange = () => {
  page.value = 1;
  fetchEvents();
};

const handleSort = (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
  page.value = 1;
  fetchEvents();
};

const confirmDelete = (event: Event) => {
  eventToDelete.value = event;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  eventToDelete.value = null;
};

const deleteEvent = async () => {
  if (!eventToDelete.value) return;

  const deletedEventTitle = eventToDelete.value.title;

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/events/${eventToDelete.value._id}`);

    // Close modal
    showDeleteModal.value = false;
    eventToDelete.value = null;

    // Show success toast
    toastMessage.value = `Event "${deletedEventTitle}" has been deleted successfully.`;
    showToast.value = true;

    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      showToast.value = false;
    }, 4000);

    // Refresh the list
    await fetchEvents();
  } catch (error) {
    console.error('Failed to delete event:', error);
    alert('Failed to delete event. Please try again.');
  }
};

// Watch for search query changes with debounce
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    page.value = 1;
    fetchEvents();
  }, 500);
});

// Lifecycle hooks
onMounted(() => {
  fetchEvents();
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

.add-new-popup {
  visibility: hidden;
  opacity: 0;
}

.add-new-popup.active {
  visibility: visible;
  opacity: 1;
}
</style>