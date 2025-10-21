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
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-[#172036]">
        <h4 class="text-lg font-semibold text-black dark:text-white">
          Staff Members ({{ event.event_staff?.length || 0 }} staff members)
        </h4>
        <div class="flex items-center gap-2">
          <button
              @click="downloadPDF"
              type="button"
              :disabled="!event.event_staff || event.event_staff.length === 0"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#15203c] border border-gray-300 dark:border-[#172036] hover:bg-gray-50 dark:hover:bg-[#1a2744] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="material-symbols-outlined !text-[18px]">download</i>
            Download PDF
          </button>
          <button
              @click="openAddStaffModal"
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-colors"
          >
            <i class="material-symbols-outlined !text-[18px]">add</i>
            Add Staff
          </button>
        </div>
      </div>

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
              Name (English)
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Name (Khmer)
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Gender
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Position
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Join Status
            </th>
            <th
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md"
            >
              Actions
            </th>
          </tr>
          </thead>
          <tbody class="text-black dark:text-white">
          <tr v-for="(staffMember, index) in event.event_staff" :key="typeof staffMember.staff === 'object' ? staffMember.staff._id : staffMember.staff">
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ index + 1 }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ typeof staffMember.staff === 'object' ? staffMember.staff.name_en : '-' }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ typeof staffMember.staff === 'object' ? staffMember.staff.name_kh : '-' }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ typeof staffMember.staff === 'object' ? staffMember.staff.gender : '-' }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ typeof staffMember.staff === 'object' ? staffMember.staff.position : '-' }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <span
                  :class="staffMember.is_joined
                    ? 'px-[8px] py-[3px] inline-block bg-success-50 dark:bg-[#15203c] text-success-500 rounded-sm font-medium text-xs'
                    : 'px-[8px] py-[3px] inline-block bg-gray-50 dark:bg-[#15203c] text-gray-500 rounded-sm font-medium text-xs'"
              >
<!--                {{ staffMember.is_joined ? 'Joined' : 'Not Joined' }}-->
                <button
                    @click="toggleJoinStatus(staffMember)"
                    type="button"
                    :title="staffMember.is_joined ? 'Mark as not joined' : 'Mark as joined'"
                    class="inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors"
                    :class="staffMember.is_joined
                      ? 'text-success-500 bg-success-50 dark:bg-success-500/10 hover:bg-success-100 dark:hover:bg-success-500/20'
                      : 'text-warning-500 bg-warning-50 dark:bg-warning-500/10 hover:bg-warning-100 dark:hover:bg-warning-500/20'"
                >
                  <i class="material-symbols-outlined !text-[18px]">
                    {{ staffMember.is_joined ? 'toggle_on' : 'toggle_off' }}
                  </i>
                </button>
              </span>
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <div class="flex items-center gap-2">
                <button
                    @click="downloadQRCode(staffMember)"
                    type="button"
                    title="Download QR-Code for Staff"
                    class="inline-flex items-center justify-center w-8 h-8 text-shadow-success-500 bg-sucess-500 dark:bg-success-500/10 hover:bg-success-100 dark:hover:bg-success-500/20 rounded-md transition-colors"
                >
                  <i class="material-symbols-outlined !text-[18px]">download</i>
                </button>
                <button
                    @click="deleteStaff(staffMember)"
                    type="button"
                    title="Remove from event"
                    class="inline-flex items-center justify-center w-8 h-8 text-danger-500 bg-danger-50 dark:bg-danger-500/10 hover:bg-danger-100 dark:hover:bg-danger-500/20 rounded-md transition-colors"
                >
                  <i class="material-symbols-outlined !text-[18px]">delete</i>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <!-- Add Staff Modal -->
  <div v-if="showAddStaffModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" @click="closeAddStaffModal"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white dark:bg-[#0c1427] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-[#172036]">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-black dark:text-white">
              Add Staff to Event
            </h3>
            <button @click="closeAddStaffModal" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <i class="material-symbols-outlined">close</i>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <!-- Search Bar -->
          <div class="mb-4">
            <input
                v-model="staffSearchQuery"
                type="text"
                placeholder="Search staff by name..."
                class="w-full px-4 py-2 border border-gray-300 dark:border-[#172036] rounded-md bg-white dark:bg-[#15203c] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Loading State -->
          <div v-if="isLoadingStaff" class="flex justify-center py-8">
            <div role="status">
              <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
          </div>

          <!-- Staff List -->
          <div v-else-if="filteredAvailableStaff.length > 0" class="space-y-2">
            <div
                v-for="staff in filteredAvailableStaff"
                :key="staff._id"
                class="flex items-center p-3 border border-gray-200 dark:border-[#172036] rounded-md hover:bg-gray-50 dark:hover:bg-[#15203c] transition-colors"
            >
              <input
                  type="checkbox"
                  :id="`staff-${staff._id}`"
                  :value="staff._id"
                  v-model="selectedStaffIds"
                  class="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label :for="`staff-${staff._id}`" class="ml-3 flex-1 cursor-pointer">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-black dark:text-white">{{ staff.name_en }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ staff.name_kh }} • {{ staff.position }}</p>
                  </div>
                  <span class="text-xs px-2 py-1 rounded-full" :class="staff.gender === 'Male' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'">
                    {{ staff.gender }}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center py-8">
            <div class="flex items-center justify-center w-12 h-12 mx-auto bg-gray-100 dark:bg-[#15203c] rounded-full mb-3">
              <i class="material-symbols-outlined text-gray-400 !text-[24px]">group</i>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">No available staff found</p>
          </div>

          <!-- Selected Count -->
          <div v-if="selectedStaffIds.length > 0" class="mt-4 p-3 bg-primary-50 dark:bg-primary-500/10 rounded-md">
            <p class="text-sm text-primary-600 dark:text-primary-400">
              {{ selectedStaffIds.length }} staff member{{ selectedStaffIds.length > 1 ? 's' : '' }} selected
            </p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-200 dark:border-[#172036] flex items-center justify-end gap-3">
          <button
              @click="closeAddStaffModal"
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#15203c] border border-gray-300 dark:border-[#172036] hover:bg-gray-50 dark:hover:bg-[#1a2744] rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
              @click="addSelectedStaff"
              type="button"
              :disabled="selectedStaffIds.length === 0 || isSavingStaff"
              class="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSavingStaff ? 'Adding...' : `Add ${selectedStaffIds.length > 0 ? selectedStaffIds.length : ''} Staff` }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import PageTitle from "@/components/Common/PageTitle.vue";
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Types
interface Staff {
  _id: string;
  name_en: string;
  name_kh: string;
  gender: string;
  position: string;
}

interface EventStaff {
  _id: string;
  staff: Staff | string;
  is_joined: boolean;
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

// Modal State
const showAddStaffModal = ref(false);
const allStaff = ref<Staff[]>([]);
const selectedStaffIds = ref<string[]>([]);
const staffSearchQuery = ref('');
const isLoadingStaff = ref(false);
const isSavingStaff = ref(false);

const isLoadingDownloadQR= ref(false);

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

const downloadQRCode = async (event_staff: EventStaff) => {
  if (!event.value) return;

  const eventId = route.params.eventId as string;
  const staff = event_staff.staff as Staff;

  isLoadingDownloadQR.value = true;

  try {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/events/get_qrcode?mode=download`,
        {
          title: `${staff.name_kh || staff.name_en}`,
          description: `${event.value.title} (${formatDateTime(event.value.start_date)} to ${formatDateTime(event.value.end_date)} )`,
          text: `${window.location.origin}/events/${eventId}/event_staff/${event_staff._id}`,
        },
        {
          responseType: 'blob' // Important: tells axios to expect a file
        }
    );

    // Create a blob URL and trigger download
    const blob = new Blob([response.data], { type: response.headers['content-type'] || 'image/png' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Generate filename from staff name and event
    const fileName = `QR_${staff.name_en.replace(/\s+/g, '_')}_${event.value.title.replace(/\s+/g, '_')}.png`;
    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log('QR Code downloaded successfully for:', staff.name_en);

  } catch (err: any) {
    console.error('Failed to download QR code:', err);
    if (err.response?.data?.message) {
      alert(`Failed to download QR code: ${err.response.data.message}`);
    } else {
      alert('Failed to download QR code. Please try again.');
    }
  } finally {
    isLoadingDownloadQR.value = false;
  }
};

const toggleJoinStatus = async (staffMember: EventStaff) => {
  if (!event.value) return;

  const staffName = typeof staffMember.staff === 'object' ? staffMember.staff.name_en : 'this staff member';
  const action = staffMember.is_joined ? 'mark as not joined' : 'mark as joined';

  const confirmed = confirm(`Are you sure you want to ${action} ${staffName}?`);

  if (!confirmed) return;

  try {
    const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/events/${event.value._id}/event_staff/${staffMember._id}/toggle`
    );

    // Update the local event data with the response
    // event.value = data.data;
    fetchEvent();

  } catch (err: any) {
    console.error('Failed to toggle join status:', err);
    alert(err.response?.data?.message || 'Failed to update join status. Please try again.');
  }
};

const deleteStaff = async (staffMember: EventStaff) => {
  if (!event.value) return;

  const staffName = typeof staffMember.staff === 'object' ? staffMember.staff.name_en : 'this staff member';

  const confirmed = confirm(`Are you sure you want to remove ${staffName} from this event? This action cannot be undone.`);

  if (!confirmed) return;

  try {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/events/${event.value._id}/event_staff/${staffMember._id}`
    );

    // Update the local event data with the response
    event.value = data.data;

  } catch (err: any) {
    console.error('Failed to delete staff:', err);
    alert(err.response?.data?.message || 'Failed to remove staff member. Please try again.');
  }
};

// Modal Methods
const openAddStaffModal = async () => {
  showAddStaffModal.value = true;
  selectedStaffIds.value = [];
  staffSearchQuery.value = '';
  await fetchAllStaff();
};

const closeAddStaffModal = () => {
  showAddStaffModal.value = false;
  selectedStaffIds.value = [];
  staffSearchQuery.value = '';
};

const fetchAllStaff = async () => {
  isLoadingStaff.value = true;
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/staffs`);
    allStaff.value = data.data || data || [];
    console.log(allStaff);
  } catch (err: any) {
    console.error('Failed to fetch staff:', err);
    alert('Failed to load staff list. Please try again.');
  } finally {
    isLoadingStaff.value = false;
  }
};

const addSelectedStaff = async () => {
  if (!event.value || selectedStaffIds.value.length === 0) return;

  isSavingStaff.value = true;

  try {
    // Send selected staff IDs to the backend
    const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/events/${event.value._id}/staff`,
        { staff: selectedStaffIds.value }
    );

    // Update local event data with the latest info
    event.value = data.data || data;

    // Close modal and reset selection
    closeAddStaffModal();
    selectedStaffIds.value = [];

    alert("Staff successfully added to event!");
  } catch (err: any) {
    console.error("Failed to add staff:", err);
    alert(err.response?.data?.message || "Failed to add staff. Please try again.");
  } finally {
    isSavingStaff.value = false;
  }
};


// Computed Properties
const filteredAvailableStaff = computed(() => {
  const search = staffSearchQuery.value.toLowerCase();

  // Filter out staff already assigned to the event
  const assignedIds = event.value?.event_staff?.map(s =>
      typeof s.staff === 'object' ? s.staff._id : s.staff
  ) || [];

  return allStaff.value
      .filter(staff => !assignedIds.includes(staff._id))
      .filter(staff =>
          staff.name_en.toLowerCase().includes(search) ||
          staff.name_kh.toLowerCase().includes(search)
      );
});

// PDF Generation
const downloadPDF = () => {
  if (!event.value) return;

  const doc = new jsPDF();

  // Set font
  doc.setFont('helvetica');

  // Add Title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text('Meeting Attendance Report', 105, 20, { align: 'center' });

  // Add a line under title
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 25, 190, 25);

  // Event Details Section
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text('Event Details', 20, 35);

  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  let yPosition = 43;

  doc.text(`Event Name: ${event.value.title}`, 20, yPosition);
  yPosition += 7;

  doc.text(`Start Date: ${formatDateTime(event.value.start_date)}`, 20, yPosition);
  yPosition += 7;

  doc.text(`End Date: ${formatDateTime(event.value.end_date)}`, 20, yPosition);
  yPosition += 7;

  if (event.value.description) {
    const descLines = doc.splitTextToSize(`Description: ${event.value.description}`, 170);
    doc.text(descLines, 20, yPosition);
    yPosition += (descLines.length * 7);
  }

  doc.text(`Allows Guest: ${event.value.allow_guest ? 'Yes' : 'No'}`, 20, yPosition);
  yPosition += 10;

  // Staff Table
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text('Staff List', 20, yPosition);
  yPosition += 5;

  // Prepare table data
  const tableData = event.value.event_staff.map((staffMember, index) => {
    const staff = typeof staffMember.staff === 'object' ? staffMember.staff : null;
    return [
      index + 1,
      staff?.name_en || '-',
      staff?.name_kh || '-',
      staff?.gender || '-',
      staff?.position || '-',
      staffMember.is_joined ? 'Joined' : 'Not Joined'
    ];
  });

  autoTable(doc, {
    startY: yPosition,
    head: [['#', 'Name (English)', 'Name (Khmer)', 'Gender', 'Position', 'Join Status']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [79, 70, 229], // Primary color
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'left'
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [60, 60, 60]
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250]
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 35 },
      2: { cellWidth: 35 },
      3: { cellWidth: 20, halign: 'center' },
      4: { cellWidth: 40 },
      5: { cellWidth: 30, halign: 'center' }
    },
    margin: { left: 20, right: 20 }
  });

  // Get the final Y position after the table
  const finalY = (doc as any).lastAutoTable.finalY || yPosition + 50;

  // Summary Report Section
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text('Summary Report', 20, finalY + 15);

  // Calculate statistics
  const totalStaff = event.value.event_staff.length;
  const joinedStaff = event.value.event_staff.filter(s => s.is_joined).length;
  const notJoinedStaff = totalStaff - joinedStaff;
  const attendanceRate = totalStaff > 0 ? ((joinedStaff / totalStaff) * 100).toFixed(1) : '0.0';

  // Gender breakdown
  const maleCount = event.value.event_staff.filter(s =>
      typeof s.staff === 'object' && s.staff.gender === 'male'
  ).length;
  const femaleCount = event.value.event_staff.filter(s =>
      typeof s.staff === 'object' && s.staff.gender === 'female'
  ).length;

  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  let summaryY = finalY + 23;

  // Summary box with border
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(250, 250, 250);
  doc.rect(20, summaryY - 5, 170, 55, 'FD');

  doc.text(`Total Staff Members: ${totalStaff}`, 25, summaryY);
  summaryY += 8;

  doc.text(`Staff Joined: ${joinedStaff}`, 25, summaryY);
  summaryY += 8;

  doc.text(`Staff Not Joined: ${notJoinedStaff}`, 25, summaryY);
  summaryY += 8;

  doc.text(`Attendance Rate: ${attendanceRate}%`, 25, summaryY);
  summaryY += 8;

  doc.text(`Gender Distribution: Male (${maleCount}), Female (${femaleCount})`, 25, summaryY);
  summaryY += 12;

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
        `Generated on ${new Date().toLocaleString()} - Page ${i} of ${pageCount}`,
        105,
        285,
        { align: 'center' }
    );
  }

  // Save PDF
  const fileName = `Event_${event.value.title.replace(/[^a-z0-9]/gi, '_')}_Staff_Report.pdf`;
  doc.save(fileName);
};

// Lifecycle
onMounted(() => {
  fetchEvent();
});
</script>

<style scoped lang="scss">

</style>