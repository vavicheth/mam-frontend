<template>
  <PageTitle pageTitle="Edit Event" subTitle="Events" />

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
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Loading event...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="loadError" class="trezo-card bg-white dark:bg-[#0c1427] mb-[25px] p-[20px] md:p-[25px] rounded-md">
    <div class="flex flex-col items-center justify-center py-20">
      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-danger-50 dark:bg-danger-500/10 rounded-full mb-4">
        <i class="material-symbols-outlined text-danger-500 !text-[32px]">error</i>
      </div>
      <h3 class="text-lg font-semibold text-black dark:text-white mb-2">
        Error Loading Event
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
        {{ loadError }}
      </p>
      <div class="flex gap-3">
        <button
          @click="fetchEvent"
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-colors"
        >
          Try Again
        </button>
        <RouterLink
          to="/events"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#15203c] hover:bg-gray-200 dark:hover:bg-[#1a2744] rounded-md transition-colors"
        >
          Back to List
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- Edit Form -->
  <div v-else-if="formData" class="trezo-card bg-white dark:bg-[#0c1427] mb-[25px] p-[20px] md:p-[25px] rounded-md">

    <div class="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-[#172036]">
      <RouterLink
          to="/events"
          class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-gray-100 dark:bg-[#15203c] hover:bg-gray-200 dark:hover:bg-[#1a2744] rounded-md transition-colors"
      >
        <i class="material-symbols-outlined !text-[18px]">arrow_back</i>
        Back to List
      </RouterLink>
    </div>

    <div class="mb-6 pb-4 border-b border-gray-100 dark:border-[#172036]">
      <h2 class="text-xl font-semibold text-black dark:text-white mb-1">
        Edit Event Information
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Update the event details below
      </p>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="space-y-5">
        <!-- Event Title -->
        <div>
          <label class="block text-sm font-medium text-black dark:text-white mb-2">
            Event Title <span class="text-danger-500">*</span>
          </label>
          <input
            v-model="formData.title"
            type="text"
            required
            placeholder="Enter event title"
            class="bg-gray-50 border border-gray-300 h-[44px] text-sm rounded-md w-full block text-black px-4 outline-0 dark:bg-[#15203c] dark:text-white dark:border-[#15203c] placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500 dark:focus:border-primary-500"
            :class="{'border-danger-500 dark:border-danger-500': errors.title}"
          />
          <p v-if="errors.title" class="text-xs text-danger-500 mt-1">{{ errors.title }}</p>
        </div>

        <!-- Start Date & Time -->
        <div>
          <label class="block text-sm font-medium text-black dark:text-white mb-2">
            Start Date & Time <span class="text-danger-500">*</span>
          </label>
          <input
            v-model="formData.start_date"
            type="datetime-local"
            required
            class="bg-gray-50 border border-gray-300 h-[44px] text-sm rounded-md w-full block text-black px-4 outline-0 dark:bg-[#15203c] dark:text-white dark:border-[#15203c] placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500 dark:focus:border-primary-500"
            :class="{'border-danger-500 dark:border-danger-500': errors.start_date}"
          />
          <p v-if="errors.start_date" class="text-xs text-danger-500 mt-1">{{ errors.start_date }}</p>
        </div>

        <!-- End Date & Time -->
        <div>
          <label class="block text-sm font-medium text-black dark:text-white mb-2">
            End Date & Time <span class="text-danger-500">*</span>
          </label>
          <input
            v-model="formData.end_date"
            type="datetime-local"
            required
            class="bg-gray-50 border border-gray-300 h-[44px] text-sm rounded-md w-full block text-black px-4 outline-0 dark:bg-[#15203c] dark:text-white dark:border-[#15203c] placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500 dark:focus:border-primary-500"
            :class="{'border-danger-500 dark:border-danger-500': errors.end_date}"
          />
          <p v-if="errors.end_date" class="text-xs text-danger-500 mt-1">{{ errors.end_date }}</p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-black dark:text-white mb-2">
            Description
          </label>
          <textarea
            v-model="formData.description"
            rows="4"
            placeholder="Enter event description"
            class="bg-gray-50 border border-gray-300 text-sm rounded-md w-full block text-black px-4 py-3 outline-0 dark:bg-[#15203c] dark:text-white dark:border-[#15203c] placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500 dark:focus:border-primary-500 resize-none"
          ></textarea>
        </div>

        <!-- Event Link -->
        <div>
          <label class="block text-sm font-medium text-black dark:text-white mb-2">
            Event Link
          </label>
          <input
            v-model="formData.event_link"
            type="url"
            placeholder="https://example.com/event"
            class="bg-gray-50 border border-gray-300 h-[44px] text-sm rounded-md w-full block text-black px-4 outline-0 dark:bg-[#15203c] dark:text-white dark:border-[#15203c] placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500 dark:focus:border-primary-500"
          />
        </div>

        <!-- Allow Guest -->
        <div>
          <label class="block text-sm font-medium text-black dark:text-white mb-2">
            Guest Access
          </label>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="formData.allow_guest"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary-500 focus:ring-primary-500 focus:ring-2"
              />
              <span class="text-sm text-black dark:text-white">Allow Guest Attendance</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="formData.allow_guest"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary-500 focus:ring-primary-500 focus:ring-2"
              />
              <span class="text-sm text-black dark:text-white">No Guest Attendance</span>
            </label>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="submitError" class="bg-danger-50 dark:bg-danger-500/10 border border-danger-500 rounded-md p-4">
          <div class="flex items-start gap-3">
            <i class="material-symbols-outlined text-danger-500 !text-[20px]">error</i>
            <div>
              <p class="text-sm font-medium text-danger-500">Failed to update event</p>
              <p class="text-xs text-danger-500 mt-1">{{ submitError }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-[#172036]">
          <button
            type="submit"
            :disabled="isSaving"
            class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isSaving">
              <i class="material-symbols-outlined !text-[18px]">save</i>
            </span>
            <span v-else>
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>
          <RouterLink
            :to="`/events/${eventId}`"
            class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#15203c] hover:bg-gray-200 dark:hover:bg-[#1a2744] rounded-md transition-colors"
          >
            <i class="material-symbols-outlined !text-[18px]">cancel</i>
            Cancel
          </RouterLink>
        </div>
      </div>
    </form>
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
      v-if="showSuccessToast"
      class="fixed top-5 right-5 z-[60] max-w-md w-full sm:w-auto"
    >
      <div class="bg-white dark:bg-[#0c1427] rounded-lg shadow-2xl border border-success-500 overflow-hidden">
        <div class="flex items-start p-4 gap-3">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-success-50 dark:bg-success-500/10">
              <i class="material-symbols-outlined text-success-500 !text-[24px]">check_circle</i>
            </div>
          </div>
          <div class="flex-1 pt-0.5">
            <h4 class="text-sm font-semibold text-black dark:text-white mb-1">
              Success!
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Event updated successfully
            </p>
          </div>
          <button
            @click="showSuccessToast = false"
            type="button"
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <i class="material-symbols-outlined !text-[20px]">close</i>
          </button>
        </div>
        <div class="h-1 bg-gray-100 dark:bg-[#15203c]">
          <div class="h-full bg-success-500 animate-toast-progress"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTitle from "@/components/Common/PageTitle.vue";
import axios from 'axios';

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

interface EventFormData {
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  allow_guest: boolean;
  event_link: string;
}

interface FormErrors {
  title?: string;
  start_date?: string;
  end_date?: string;
}

// Router
const route = useRoute();
const router = useRouter();

// State
const eventId = ref<string>(route.params.eventId as string);
const formData = ref<EventFormData | null>(null);
const errors = ref<FormErrors>({});
const isLoading = ref(false);
const isSaving = ref(false);
const loadError = ref<string | null>(null);
const submitError = ref<string | null>(null);
const showSuccessToast = ref(false);

// Methods
const fetchEvent = async () => {
  if (!eventId.value) {
    loadError.value = 'Event ID is missing';
    return;
  }

  isLoading.value = true;
  loadError.value = null;

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/events/${eventId.value}`);

    // Convert ISO date strings to datetime-local format
    const formatDateForInput = (isoString: string): string => {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // Populate form data
    formData.value = {
      title: data.title,
      start_date: formatDateForInput(data.start_date),
      end_date: formatDateForInput(data.end_date),
      description: data.description || '',
      allow_guest: data.allow_guest,
      event_link: data.event_link || ''
    };
  } catch (err: any) {
    console.error('Failed to fetch event:', err);
    if (err.response?.status === 404) {
      loadError.value = 'Event not found';
    } else if (err.response?.status === 400) {
      loadError.value = 'Invalid event ID';
    } else {
      loadError.value = 'Failed to load event. Please try again later.';
    }
  } finally {
    isLoading.value = false;
  }
};

const validateForm = (): boolean => {
  errors.value = {};
  let isValid = true;

  if (!formData.value?.title || formData.value.title.trim() === '') {
    errors.value.title = 'Event title is required';
    isValid = false;
  }

  if (!formData.value?.start_date) {
    errors.value.start_date = 'Start date is required';
    isValid = false;
  }

  if (!formData.value?.end_date) {
    errors.value.end_date = 'End date is required';
    isValid = false;
  }

  if (formData.value?.start_date && formData.value?.end_date) {
    if (new Date(formData.value.start_date) >= new Date(formData.value.end_date)) {
      errors.value.end_date = 'End date must be after start date';
      isValid = false;
    }
  }

  return isValid;
};

const handleSubmit = async () => {
  submitError.value = null;

  if (!validateForm()) {
    return;
  }

  isSaving.value = true;

  try {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/events/${eventId.value}`,
      {
        title: formData.value?.title.trim(),
        start_date: formData.value?.start_date,
        end_date: formData.value?.end_date,
        description: formData.value?.description.trim(),
        allow_guest: formData.value?.allow_guest,
        event_link: formData.value?.event_link.trim()
      }
    );

    // Show success toast
    showSuccessToast.value = true;

    // Auto-hide toast and redirect after 2 seconds
    setTimeout(() => {
      showSuccessToast.value = false;
      router.push(`/events/${eventId.value}`);
    }, 2000);
  } catch (err: any) {
    console.error('Failed to update event:', err);
    if (err.response?.data?.message) {
      submitError.value = err.response.data.message;
    } else {
      submitError.value = 'Failed to update event. Please try again.';
    }
  } finally {
    isSaving.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchEvent();
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
  animation: toast-progress 2s linear forwards;
}
</style>