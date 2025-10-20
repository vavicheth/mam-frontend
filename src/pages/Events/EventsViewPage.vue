<template>
  <PageTitle pageTitle="Event Details" subTitle="Events" />

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
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Loading event details...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="trezo-card bg-white dark:bg-[#0c1427] mb-[25px] p-[20px] md:p-[25px] rounded-md">
    <div class="flex flex-col items-center justify-center py-20">
      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-danger-50 dark:bg-danger-500/10 rounded-full mb-4">
        <i class="material-symbols-outlined text-danger-500 !text-[32px]">error</i>
      </div>
      <h3 class="text-lg font-semibold text-black dark:text-white mb-2">
        Error Loading Event
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
        {{ error }}
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

  <!-- Event Details -->
  <div v-else-if="event" class="space-y-[25px]">
    <!-- Header Card with Actions -->
    <div class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-[#172036]">
        <RouterLink
            to="/events"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#15203c] hover:bg-gray-200 dark:hover:bg-[#1a2744] rounded-md transition-colors"
        >
          <i class="material-symbols-outlined !text-[18px]">arrow_back</i>
          Back to List
        </RouterLink>
        <RouterLink
            :to="`/events/${event._id}/edit`"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white rounded-md transition-colors"
        >
          <i class="material-symbols-outlined !text-[18px]">edit</i>
          Edit Event
        </RouterLink>
      </div>

      <div class="flex items-center justify-between mb-4 mt-4">
        <div>
          <h2 class="text-2xl font-bold text-black dark:text-white mb-1">
            {{ event.title }}
          </h2>
          <div class="flex items-center gap-4 mt-2">
            <span
              :class="event.allow_guest
                ? 'px-[12px] py-[6px] inline-block bg-success-50 dark:bg-[#15203c] text-success-500 rounded-md font-medium text-sm'
                : 'px-[12px] py-[6px] inline-block bg-gray-50 dark:bg-[#15203c] text-gray-500 rounded-md font-medium text-sm'"
            >
              {{ event.allow_guest ? 'Allows Guest' : 'No Guest' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Event Info Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Start Date & Time
          </label>
          <p class="text-sm text-black dark:text-white leading-relaxed bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ formatDateTime(event.start_date) }}
          </p>
        </div>

        <div class="space-y-1">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            End Date & Time
          </label>
          <p class="text-sm text-black dark:text-white leading-relaxed bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ formatDateTime(event.end_date) }}
          </p>
        </div>

        <!-- Description (Full Width) -->
        <div class="space-y-1 md:col-span-2">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Description
          </label>
          <p class="text-sm text-black dark:text-white leading-relaxed bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            {{ event.description || 'No description available' }}
          </p>
        </div>

        <!-- Event Link -->
        <div v-if="event.event_link" class="space-y-1 md:col-span-2">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Event Link
          </label>
          <a
            :href="event.event_link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-primary-500 hover:text-primary-600 leading-relaxed bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md block break-all transition-colors"
          >
            {{ event.event_link }}
          </a>
        </div>

        <!-- QR Code -->
        <div v-if="event.qr_code" class="space-y-1 md:col-span-2">
          <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            QR Code
          </label>
          <div class="bg-gray-50 dark:bg-[#15203c] px-4 py-3 rounded-md">
            <img :src="event.qr_code" alt="Event QR Code" class="max-w-[200px] h-auto" />
          </div>
        </div>
      </div>
    </div>

    <!-- Staff in Event -->
    <div class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">
      <h4 class="text-lg font-semibold text-black dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-[#172036]">
        Staff Members ({{ event.event_staff?.length || 0 }} staff members)
      </h4>

      <!-- Empty State -->
      <div v-if="!event.event_staff || event.event_staff.length === 0" class="flex flex-col items-center justify-center py-12">
        <div class="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 dark:bg-[#15203c] rounded-full mb-4">
          <i class="material-symbols-outlined text-gray-400 !text-[32px]">group</i>
        </div>
        <h3 class="text-lg font-semibold text-black dark:text-white mb-2">
          No Staff Members
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
          There are currently no staff members assigned to this event.
        </p>
      </div>

      <!-- Staff Table -->
      <div v-else class="table-responsive overflow-x-auto">
        <table class="w-full">
          <thead class="text-black dark:text-white">
          <tr>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              #
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Staff ID
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Join Status
            </th>
          </tr>
          </thead>
          <tbody class="text-black dark:text-white">
          <tr v-for="(staffMember, index) in event.event_staff" :key="staffMember.staff || index">
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ index + 1 }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ staffMember.staff || '-' }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <span
                  :class="staffMember.is_join
                    ? 'px-[8px] py-[3px] inline-block bg-success-50 dark:bg-[#15203c] text-success-500 rounded-sm font-medium text-xs'
                    : 'px-[8px] py-[3px] inline-block bg-gray-50 dark:bg-[#15203c] text-gray-500 rounded-sm font-medium text-xs'"
              >
                {{ staffMember.is_join ? 'Joined' : 'Not Joined' }}
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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

// Router
const route = useRoute();

// State
const event = ref<Event | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Utility function to format date and time
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Methods
const fetchEvent = async () => {
  const eventId = route.params.eventId as string;

  if (!eventId) {
    error.value = 'Event ID is missing';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/events/${eventId}`);

    // Ensure event_staff is always an array
    if (data && !Array.isArray(data.event_staff)) {
      data.event_staff = [];
    }

    event.value = data;

  } catch (err: any) {
    console.error('Failed to fetch event:', err);
    if (err.response?.status === 404) {
      error.value = 'Event not found';
    } else if (err.response?.status === 400) {
      error.value = 'Invalid event ID';
    } else {
      error.value = 'Failed to load event details. Please try again later.';
    }
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchEvent();
});
</script>

<style scoped lang="scss">

</style>