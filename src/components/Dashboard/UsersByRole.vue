<template>
  <div class="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md">
    <div class="trezo-card-header mb-[20px] md:mb-[25px]">
      <div class="trezo-card-title">
        <h5 class="!mb-0">Users by Role</h5>
      </div>
    </div>
    <div class="trezo-card-content">
      <div v-if="isClient" class="mb-[20px]">
        <apexchart
          type="donut"
          height="260"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div class="space-y-3">
        <div
          v-for="(role, index) in roleStats"
          :key="role.name"
          class="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#15203c] rounded-md"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-3 h-3 rounded-full"
              :style="{ backgroundColor: colors[index] }"
            ></div>
            <span class="text-sm font-medium text-black dark:text-white capitalize">
              {{ role.name }}
            </span>
          </div>
          <span class="text-sm font-semibold text-black dark:text-white">
            {{ role.count }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

interface User {
  _id: string;
  name: string;
  role: 'admin' | 'user' | 'manager';
  active: boolean;
}

const props = defineProps<{
  users: User[];
}>();

const isClient = ref(false);
const colors = ['#4936F5', '#EE368C', '#00D7C0'];

const roleStats = computed(() => {
  const stats = {
    admin: 0,
    manager: 0,
    user: 0
  };

  props.users.forEach(user => {
    if (user.role in stats) {
      stats[user.role as keyof typeof stats]++;
    }
  });

  return [
    { name: 'admin', count: stats.admin },
    { name: 'manager', count: stats.manager },
    { name: 'user', count: stats.user }
  ];
});

const series = computed(() => roleStats.value.map(r => r.count));

const chartOptions = ref({
  chart: {
    type: 'donut',
    height: 260
  },
  labels: ['Admin', 'Manager', 'User'],
  colors: colors,
  stroke: {
    width: 0
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            fontFamily: 'Inter',
            color: '#64748B',
            offsetY: -10
          },
          value: {
            show: true,
            fontSize: '24px',
            fontFamily: 'Inter',
            fontWeight: 700,
            color: '#0F172A',
            offsetY: 5,
            formatter: function (val: string) {
              return val;
            }
          },
          total: {
            show: true,
            label: 'Total Users',
            fontSize: '14px',
            fontFamily: 'Inter',
            color: '#64748B',
            formatter: function (w: any) {
              return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
            }
          }
        }
      }
    }
  },
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + ' users';
      }
    }
  }
});

onMounted(() => {
  isClient.value = true;
});
</script>