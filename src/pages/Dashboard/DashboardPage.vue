<template>
  <WelcomeBack :userName="currentUserName" />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-[25px] mb-[25px]">
    <TotalEmployees :totalCount="stats.totalStaff" :isLoading="isLoading" />

    <TotalDepartments :totalCount="stats.totalDepartments" :isLoading="isLoading" />

    <TotalEvents :totalCount="stats.totalEvents" :isLoading="isLoading" />
  </div>

<!--  <div class="grid grid-cols-1 lg:grid-cols-3 gap-[25px] mb-[25px]">-->
<!--    <div class="lg:col-span-2">-->
<!--      <EmployeeAttendanceTrendsChart :events="recentEvents" />-->
<!--    </div>-->
<!--    <div class="lg:col-span-1">-->
<!--      <EmployeeWorkFormatChart :stats="stats" />-->
<!--    </div>-->
<!--  </div>-->

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-[25px] mb-[25px]">
    <div class="lg:col-span-1">
      <UsersByRole :users="users" />
    </div>
    <div class="lg:col-span-2">
      <RecentEvents :events="recentEvents" :isLoading="isLoading" />
    </div>
  </div>

  <DashboardStaffList :staffList="recentStaff" :isLoading="isLoading" />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import axios from 'axios';
import WelcomeBack from '@/components/Dashboard/HRM/WelcomeBack.vue';
import TotalEmployees from '@/components/Dashboard/HRM/TotalEmployees.vue';
import EmployeeAttendanceTrendsChart from '@/components/Dashboard/HRM/EmployeeAttendanceTrendsChart.vue';
import EmployeeWorkFormatChart from '@/components/Dashboard/HRM/EmployeeWorkFormatChart.vue';

// Import or create new components
import TotalDepartments from '@/components/Dashboard/TotalDepartments.vue';
import TotalEvents from '@/components/Dashboard/TotalEvents.vue';
import UsersByRole from '@/components/Dashboard/UsersByRole.vue';
import RecentEvents from '@/components/Dashboard/RecentEvents.vue';
import DashboardStaffList from '@/components/Dashboard/DashboardStaffList.vue';

// Types
interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  avatar?: string;
  active: boolean;
}

interface Staff {
  _id: string;
  name_kh: string;
  name_en: string;
  dob: string;
  gender: 'male' | 'female';
  position: string;
  description: string;
  active: boolean;
  department?: {
    _id: string;
    name_en: string;
    name_kh: string;
  };
}

interface Department {
  _id: string;
  name_kh: string;
  name_en: string;
  description: string;
  active: boolean;
}

interface Event {
  _id: string;
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  allow_guest: boolean;
  event_link: string;
  event_staff: any[];
}

interface Stats {
  totalUsers: number;
  totalStaff: number;
  totalDepartments: number;
  totalEvents: number;
  activeUsers: number;
  activeStaff: number;
  activeDepartments: number;
}

// State
const isLoading = ref(false);
const users = ref<User[]>([]);
const recentStaff = ref<Staff[]>([]);
const departments = ref<Department[]>([]);
const recentEvents = ref<Event[]>([]);

const stats = reactive<Stats>({
  totalUsers: 0,
  totalStaff: 0,
  totalDepartments: 0,
  totalEvents: 0,
  activeUsers: 0,
  activeStaff: 0,
  activeDepartments: 0
});

// Computed
const currentUserName = computed(() => {
  // You can get this from localStorage or auth store
  return localStorage.getItem('userName') || 'User';
});

// Methods
const fetchDashboardData = async () => {
  isLoading.value = true;
  try {
    // Fetch all data in parallel
    const [usersRes, staffRes, departmentsRes, eventsRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/users`, { params: { limit: 100 } }),
      axios.get(`${import.meta.env.VITE_API_URL}/staff`, { params: { limit: 10, sortBy: 'createdAt', sortOrder: 'desc' } }),
      axios.get(`${import.meta.env.VITE_API_URL}/departments`, { params: { limit: 100 } }),
      axios.get(`${import.meta.env.VITE_API_URL}/events`, { params: { limit: 5, sortBy: 'start_date', sortOrder: 'desc' } })
    ]);

    // Set users data
    users.value = usersRes.data.docs || [];
    stats.totalUsers = usersRes.data.totalDocs || users.value.length;
    stats.activeUsers = users.value.filter(u => u.active).length;

    // Set staff data
    recentStaff.value = staffRes.data.docs || [];
    stats.totalStaff = staffRes.data.totalDocs || 0;
    stats.activeStaff = recentStaff.value.filter(s => s.active).length;

    // Set departments data
    departments.value = departmentsRes.data.docs || [];
    stats.totalDepartments = departmentsRes.data.totalDocs || departments.value.length;
    stats.activeDepartments = departments.value.filter(d => d.active).length;

    // Set events data
    recentEvents.value = eventsRes.data.docs || [];
    stats.totalEvents = eventsRes.data.totalDocs || 0;

  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchDashboardData();
});
</script>

