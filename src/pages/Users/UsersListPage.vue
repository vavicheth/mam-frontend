<template>
  <PageTitle pageTitle="Users List" subTitle="Users" />

  <!-- Add New User Popup -->
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
            <h5 class="!mb-0">Add New User</h5>
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
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
              <!-- Name -->
              <div>
                <label class="mb-[10px] text-black dark:text-white font-medium block">
                  Name <span class="text-danger-500">*</span>
                </label>
                <input
                    v-model="formData.name"
                    type="text"
                    :class="[
                      'h-[48px] rounded-md text-black dark:text-white border bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400',
                      formErrors.name ? 'border-danger-500 focus:border-danger-500' : 'border-gray-200 dark:border-[#172036] focus:border-primary-500'
                    ]"
                    placeholder="Enter full name"
                />
                <p v-if="formErrors.name" class="text-danger-500 text-sm mt-1">{{ formErrors.name }}</p>
              </div>

              <!-- Username -->
              <div>
                <label class="mb-[10px] text-black dark:text-white font-medium block">
                  Username <span class="text-danger-500">*</span>
                </label>
                <input
                    v-model="formData.username"
                    type="text"
                    :class="[
                      'h-[48px] rounded-md text-black dark:text-white border bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400',
                      formErrors.username ? 'border-danger-500 focus:border-danger-500' : 'border-gray-200 dark:border-[#172036] focus:border-primary-500'
                    ]"
                    placeholder="Enter username"
                />
                <p v-if="formErrors.username" class="text-danger-500 text-sm mt-1">{{ formErrors.username }}</p>
              </div>

              <!-- Email -->
              <div>
                <label class="mb-[10px] text-black dark:text-white font-medium block">
                  Email <span class="text-danger-500">*</span>
                </label>
                <input
                    v-model="formData.email"
                    type="email"
                    :class="[
                      'h-[48px] rounded-md text-black dark:text-white border bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400',
                      formErrors.email ? 'border-danger-500 focus:border-danger-500' : 'border-gray-200 dark:border-[#172036] focus:border-primary-500'
                    ]"
                    placeholder="Enter email address"
                />
                <p v-if="formErrors.email" class="text-danger-500 text-sm mt-1">{{ formErrors.email }}</p>
              </div>

              <!-- Password -->
              <div>
                <label class="mb-[10px] text-black dark:text-white font-medium block">
                  Password <span class="text-danger-500">*</span>
                </label>
                <input
                    v-model="formData.password"
                    type="password"
                    :class="[
                      'h-[48px] rounded-md text-black dark:text-white border bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400',
                      formErrors.password ? 'border-danger-500 focus:border-danger-500' : 'border-gray-200 dark:border-[#172036] focus:border-primary-500'
                    ]"
                    placeholder="Enter password"
                />
                <p v-if="formErrors.password" class="text-danger-500 text-sm mt-1">{{ formErrors.password }}</p>
              </div>

              <!-- Role -->
              <div>
                <label class="mb-[10px] text-black dark:text-white font-medium block">
                  Role <span class="text-danger-500">*</span>
                </label>
                <select
                    v-model="formData.role"
                    :class="[
                      'h-[48px] rounded-md text-black dark:text-white border bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all cursor-pointer',
                      formErrors.role ? 'border-danger-500 focus:border-danger-500' : 'border-gray-200 dark:border-[#172036] focus:border-primary-500'
                    ]"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>
                <p v-if="formErrors.role" class="text-danger-500 text-sm mt-1">{{ formErrors.role }}</p>
              </div>

              <!-- Staff -->
              <div class="relative">
                <label class="mb-[10px] text-black dark:text-white font-medium block">
                  Staff <span class="text-danger-500">*</span>
                </label>
                <div class="relative">
                  <input
                      v-model="staffSearchQuery"
                      @focus="showStaffDropdown = true"
                      @input="filterStaff"
                      type="text"
                      :class="[
                        'h-[48px] rounded-md text-black dark:text-white border bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400',
                        formErrors.staff ? 'border-danger-500 focus:border-danger-500' : 'border-gray-200 dark:border-[#172036] focus:border-primary-500'
                      ]"
                      placeholder="Search and select staff..."
                  />
                  <i v-if="!selectedStaff" class="material-symbols-outlined absolute right-[17px] top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    search
                  </i>
                  <button
                      v-if="selectedStaff"
                      @click="clearStaffSelection"
                      type="button"
                      class="absolute right-[17px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-danger-500 transition-colors"
                  >
                    <i class="material-symbols-outlined">close</i>
                  </button>

                  <!-- Dropdown List -->
                  <div
                      v-if="showStaffDropdown && filteredStaffList.length > 0"
                      class="absolute z-50 w-full mt-1 max-h-[200px] overflow-y-auto bg-white dark:bg-[#0c1427] border border-gray-200 dark:border-[#172036] rounded-md shadow-lg"
                  >
                    <button
                        v-for="staff in filteredStaffList"
                        :key="staff._id"
                        type="button"
                        @click="selectStaff(staff)"
                        class="w-full px-[17px] py-[10px] text-left hover:bg-gray-50 dark:hover:bg-[#15203c] transition-colors text-black dark:text-white border-b border-gray-100 dark:border-[#172036] last:border-b-0"
                    >
                      <div class="font-medium">{{ staff.name_en }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ staff.name_kh }}</div>
                    </button>
                  </div>

                  <!-- No Results -->
                  <div
                      v-if="showStaffDropdown && filteredStaffList.length === 0 && staffSearchQuery"
                      class="absolute z-50 w-full mt-1 bg-white dark:bg-[#0c1427] border border-gray-200 dark:border-[#172036] rounded-md shadow-lg px-[17px] py-[10px] text-gray-500 dark:text-gray-400"
                  >
                    No staff found
                  </div>
                </div>
                <p v-if="formErrors.staff" class="text-danger-500 text-sm mt-1">{{ formErrors.staff }}</p>
              </div>

              <!-- Avatar URL -->
              <div class="sm:col-span-2">
                <label class="mb-[10px] text-black dark:text-white font-medium block">
                  Avatar URL
                </label>
                <input
                    v-model="formData.avatar"
                    type="text"
                    class="h-[48px] rounded-md text-black dark:text-white border border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500"
                    placeholder="Enter avatar URL (optional)"
                />
              </div>

              <!-- Status -->
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-black dark:text-white mb-2">
                  Status <span class="text-danger-500">*</span>
                </label>
                <div class="flex items-center gap-4">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                        v-model="formData.active"
                        type="radio"
                        :value="true"
                        class="w-4 h-4 text-primary-500 focus:ring-primary-500 focus:ring-2"
                    />
                    <span class="text-sm text-black dark:text-white">Active</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                        v-model="formData.active"
                        type="radio"
                        :value="false"
                        class="w-4 h-4 text-primary-500 focus:ring-primary-500 focus:ring-2"
                    />
                    <span class="text-sm text-black dark:text-white">Inactive</span>
                  </label>
                </div>
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
                  @click="createUser"
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
              placeholder="Search user..."
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
            Add New User
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
          <p class="text-sm text-gray-600 dark:text-gray-400">Loading users...</p>
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
                @click="handleSort('name')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Name</span>
                <i v-if="sortBy === 'name'" class="material-symbols-outlined !text-[18px]">
                  {{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                </i>
                <i v-else class="material-symbols-outlined !text-[18px] opacity-30">
                  unfold_more
                </i>
              </div>
            </th>
            <th
                @click="handleSort('username')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Username</span>
                <i v-if="sortBy === 'username'" class="material-symbols-outlined !text-[18px]">
                  {{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                </i>
                <i v-else class="material-symbols-outlined !text-[18px] opacity-30">
                  unfold_more
                </i>
              </div>
            </th>
            <th
                @click="handleSort('email')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Email</span>
                <i v-if="sortBy === 'email'" class="material-symbols-outlined !text-[18px]">
                  {{ sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                </i>
                <i v-else class="material-symbols-outlined !text-[18px] opacity-30">
                  unfold_more
                </i>
              </div>
            </th>
            <th
                @click="handleSort('role')"
                class="font-medium ltr:text-left rtl:text-right px-[20px] py-[11px] bg-gray-50 dark:bg-[#15203c] whitespace-nowrap ltr:first:rounded-tl-md ltr:last:rounded-tr-md rtl:first:rounded-tr-md rtl:last:rounded-tl-md cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a2744] transition-colors"
            >
              <div class="flex items-center gap-2">
                <span>Role</span>
                <i v-if="sortBy === 'role'" class="material-symbols-outlined !text-[18px]">
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
              Staff
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
          <tr v-for="(user, index) in users" :key="user._id">
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ (pagination.page - 1) * limit + index + 1 }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <div class="flex items-center">
                <img
                    v-if="user.avatar"
                    :src="user.avatar"
                    alt="Avatar"
                    class="w-[40px] h-[40px] rounded-full object-cover"
                />
                <div
                    v-else
                    class="w-[40px] h-[40px] rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold"
                >
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <span class="block text-[15px] font-medium ltr:ml-[12px] rtl:mr-[12px]">
                  {{ user.name }}
                </span>
              </div>
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ user.username }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ user.email }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <span
                  :class="getRoleBadgeClass(user.role)"
                  class="px-[8px] py-[3px] inline-block rounded-sm font-medium text-xs capitalize"
              >
                {{ user.role }}
              </span>
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              {{ user.staff ? user.staff.name_en : 'N/A' }}
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <span
                  :class="user.active
                    ? 'px-[8px] py-[3px] inline-block bg-success-50 dark:bg-[#15203c] text-success-500 rounded-sm font-medium text-xs'
                    : 'px-[8px] py-[3px] inline-block bg-danger-50 dark:bg-[#15203c] text-danger-500 rounded-sm font-medium text-xs'"
              >
                {{ user.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td
                class="ltr:text-left rtl:text-right whitespace-nowrap px-[20px] py-[15px] border-b border-gray-100 dark:border-[#172036] ltr:first:border-l ltr:last:border-r rtl:first:border-r rtl:last:border-l"
            >
              <div class="flex items-center gap-[9px]">
                <RouterLink
                    :to="`/users/${user._id}`"
                    class="text-primary-500 leading-none custom-tooltip"
                    v-tooltip="'View'"
                >
                  <i class="material-symbols-outlined !text-md">
                    visibility
                  </i>
                </RouterLink>
                <RouterLink
                    :to="`/users/${user._id}/edit`"
                    class="text-gray-500 dark:text-gray-400 leading-none custom-tooltip hover:text-primary-500 transition-colors"
                    v-tooltip="'Edit'"
                >
                  <i class="material-symbols-outlined !text-md"> edit </i>
                </RouterLink>
                <button
                    type="button"
                    @click="confirmDelete(user)"
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
      <div @click="cancelDelete" class="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      <div class="relative bg-white dark:bg-[#0c1427] rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 mx-auto bg-danger-50 dark:bg-danger-500/10 rounded-full mb-4">
            <i class="material-symbols-outlined text-danger-500 !text-[24px]">warning</i>
          </div>
          <h3 class="text-lg font-semibold text-center text-black dark:text-white mb-2">
            Delete User
          </h3>
          <p class="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete "<strong>{{ userToDelete?.name }}</strong>"? This action cannot be undone.
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
                @click="deleteUser"
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
                {{ toastMessage }}
              </p>
            </div>
            <button
                @click="showToast = false"
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import PageTitle from "@/components/Common/PageTitle.vue";
import axios from 'axios';
import Pagination from "@/components/Common/Pagination.vue";

// Types
interface Staff {
  _id: string;
  name_kh: string;
  name_en: string;
  dob: string;
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
  password?: string;
  role: 'admin' | 'user' | 'manager';
  avatar?: string;
  staff?: Staff;
  active: boolean;
}

interface PaginationData {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Reactive state
const users = ref<User[]>([]);
const staffList = ref<Staff[]>([]);
const filteredStaffList = ref<Staff[]>([]);
const page = ref(1);
const limit = ref(10);
const totalDocs = ref(0);
const searchQuery = ref('');
const sortBy = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');
const isLoading = ref(false);
const showDeleteModal = ref(false);
const userToDelete = ref<User | null>(null);
const showToast = ref(false);
const toastMessage = ref('');
const pagination = reactive<PaginationData>({
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false
});

// Staff searchable dropdown state
const staffSearchQuery = ref('');
const showStaffDropdown = ref(false);
const selectedStaff = ref<Staff | null>(null);

// Form data for new user
const formData = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  role: '',
  avatar: '',
  staff: '',
  active: true
});

// Add new modal
const showNewModal = ref(false);
const isCreating = ref(false);
const formErrors = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  role: '',
  staff: ''
});

const resetForm = () => {
  formData.value = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    avatar: '',
    staff: '',
    active: true
  };
  formErrors.value = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    staff: ''
  };
  staffSearchQuery.value = '';
  selectedStaff.value = null;
  showStaffDropdown.value = false;
};

const openNewModal = async () => {
  resetForm();
  await fetchStaffList();
  showNewModal.value = true;
};

const closeNewModal = () => {
  showNewModal.value = false;
  resetForm();
};

const validateForm = (): boolean => {
  let isValid = true;
  formErrors.value = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    staff: ''
  };

  if (!formData.value.name.trim()) {
    formErrors.value.name = 'Name is required';
    isValid = false;
  }

  if (!formData.value.username.trim()) {
    formErrors.value.username = 'Username is required';
    isValid = false;
  }

  if (!formData.value.email.trim()) {
    formErrors.value.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    formErrors.value.email = 'Invalid email format';
    isValid = false;
  }

  if (!formData.value.password.trim()) {
    formErrors.value.password = 'Password is required';
    isValid = false;
  } else if (formData.value.password.length < 6) {
    formErrors.value.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  if (!formData.value.role) {
    formErrors.value.role = 'Role is required';
    isValid = false;
  }

  if (!formData.value.staff) {
    formErrors.value.staff = 'Staff is required';
    isValid = false;
  }

  return isValid;
};

const createUser = async () => {
  if (!validateForm()) {
    return;
  }

  isCreating.value = true;

  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      name: formData.value.name.trim(),
      username: formData.value.username.trim(),
      email: formData.value.email.trim(),
      password: formData.value.password,
      role: formData.value.role,
      avatar: formData.value.avatar.trim() || undefined,
      staff: formData.value.staff,
      active: formData.value.active
    });

    closeNewModal();

    toastMessage.value = `User "${formData.value.name}" has been created successfully.`;
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 4000);

    await fetchUsers();
  } catch (error: any) {
    console.error('Failed to create user:', error);
    const errorMsg = error.response?.data?.message || 'Failed to create user. Please try again.';
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

// Methods
const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const params: any = {
      page: page.value,
      limit: limit.value
    };

    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim();
    }

    if (sortBy.value) {
      params.sortBy = sortBy.value;
      params.sortOrder = sortOrder.value;
    }

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
      params
    });

    users.value = data.docs;
    totalDocs.value = data.totalDocs;
    pagination.page = data.page;
    pagination.totalPages = data.totalPages;
    pagination.hasNextPage = data.hasNextPage;
    pagination.hasPrevPage = data.hasPrevPage;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchStaffList = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/staff`, {
      params: {
        limit: 1000,
        active: true
      }
    });
    staffList.value = data.docs;
    filteredStaffList.value = data.docs;
  } catch (error) {
    console.error('Failed to fetch staff list:', error);
  }
};

const goToFirstPage = () => {
  page.value = 1;
  fetchUsers();
};

const prevPage = () => {
  if (pagination.hasPrevPage) {
    page.value--;
    fetchUsers();
  }
};

const nextPage = () => {
  if (pagination.hasNextPage) {
    page.value++;
    fetchUsers();
  }
};

const goToLastPage = () => {
  page.value = pagination.totalPages;
  fetchUsers();
};

const goToPage = (pageNum: number) => {
  page.value = pageNum;
  fetchUsers();
};

const onLimitChange = () => {
  page.value = 1;
  fetchUsers();
};

const handleSort = (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
  page.value = 1;
  fetchUsers();
};

const confirmDelete = (user: User) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  userToDelete.value = null;
};

const deleteUser = async () => {
  if (!userToDelete.value) return;

  const deletedUserName = userToDelete.value.name;

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userToDelete.value._id}`);

    showDeleteModal.value = false;
    userToDelete.value = null;

    toastMessage.value = `User "${deletedUserName}" has been deleted successfully.`;
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 4000);

    await fetchUsers();
  } catch (error) {
    console.error('Failed to delete user:', error);
    alert('Failed to delete user. Please try again.');
  }
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

// Staff dropdown methods
const filterStaff = () => {
  const query = staffSearchQuery.value.toLowerCase().trim();

  if (!query) {
    filteredStaffList.value = staffList.value;
  } else {
    filteredStaffList.value = staffList.value.filter(staff =>
      staff.name_en.toLowerCase().includes(query) ||
      staff.name_kh.toLowerCase().includes(query)
    );
  }
};

const selectStaff = (staff: Staff) => {
  selectedStaff.value = staff;
  formData.value.staff = staff._id;
  staffSearchQuery.value = staff.name_en;
  showStaffDropdown.value = false;
  formErrors.value.staff = '';
};

const clearStaffSelection = () => {
  selectedStaff.value = null;
  formData.value.staff = '';
  staffSearchQuery.value = '';
  filteredStaffList.value = staffList.value;
};

// Watch for search query changes with debounce
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    page.value = 1;
    fetchUsers();
  }, 500);
});

// Lifecycle hooks
onMounted(() => {
  fetchUsers();
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