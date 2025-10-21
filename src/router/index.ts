import { createRouter, createWebHistory } from "vue-router";

import EventsListPage from "../pages/Events/EventsListPage.vue";
import UsersListPage from "../pages/Users/UsersListPage.vue";
import UserProfilePage from "../pages/Profile/UserProfilePage.vue";
import StarterPage from "../pages/StarterPage.vue";
import LockScreenPage from "../pages/Authentication/LockScreenPage.vue";
import MyProfilePage from "../pages/MyProfilePage.vue";
import TestPage from "../components/Pages/Test/TestPage.vue"
import ErrorPage from "../pages/ErrorPage.vue";
import DashboardPage from "@/pages/Dashboard/DashboardPage.vue";
import StaffListPage from "@/pages/Staff/StaffListPage.vue";
import LoginPage from "@/pages/Authentication/LoginPage.vue";
import DepartmentsListPage from "@/pages/Departments/DepartmentsListPage.vue";
import DepartmentViewPage from "@/pages/Departments/DepartmentViewPage.vue";
import DepartmentEditPage from "@/pages/Departments/DepartmentEditPage.vue";
import StaffViewPage from "@/pages/Staff/StaffViewPage.vue";
import StaffEditPage from "@/pages/Staff/StaffEditPage.vue";
import EventsEditPage from "@/pages/Events/EventsEditPage.vue";
import EventsViewPage from "@/pages/Events/EventsViewPage.vue";
import UsersViewPage from "@/pages/Users/UsersViewPage.vue";
import UsersEditPage from "@/pages/Users/UsersEditPage.vue";

const routes = [
  {
    path: "/vicheth",
    name:"Vicheth",
    component: TestPage,
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
  },
  {
    path: '/',
    redirect: '/dashboard', // This redirects the root path to /dashboard
  },
  {
    path: "/events",
    name: "Events",
    component: EventsListPage,
  },
  {
    path: "/events/:eventId",
    name: "EventsViewPage",
    component: EventsViewPage,
  },
  {
    path: "/events/:eventId/edit",
    name: "EventsEditPage",
    component: EventsEditPage,
  },
  {
    path: "/staff",
    name: "StaffListPage",
    component: StaffListPage,
  },
  {
    path: "/staff/:staffId",
    name: "StaffViewPage",
    component: StaffViewPage,
  },
  {
    path: "/staff/:staffId/edit",
    name: "StaffEditPage",
    component: StaffEditPage,
  },
  {
    path: "/departments",
    name: "DepartmentListPage",
    component: DepartmentsListPage,
  },
  {
    path: "/departments/:departmentId",
    name: "DepartmentViewPage",
    component: DepartmentViewPage,
  },
  {
    path: "/departments/:departmentId/edit",
    name: "DepartmentEditPage",
    component: DepartmentEditPage,
  },

  {
    path: "/users",
    name: "UserListPage",
    component: UsersListPage,
  },
  {
    path: "/users/:userId",
    name: "UserViewPage",
    component: UsersViewPage,
  },
  {
    path: "/users/:userId/edit",
    name: "UserEditPage",
    component: UsersEditPage,
  },


  {
    path: "/starter",
    name: "StarterPage",
    component: StarterPage,
  },


  {
    path: "/profile/user-profile",
    name: "UserProfilePage",
    component: UserProfilePage,
  },

  {
    path: "/my-profile",
    name: "MyProfilePage",
    component: MyProfilePage,
  },

  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/lock-screen",
    name: "LockScreenPage",
    component: LockScreenPage,
  },


  { path: "/:pathMatch(.*)*", name: "ErrorPage", component: ErrorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "active",
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});
// Navigation guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('user');
  const isLocked = localStorage.getItem('isLocked') === 'true';

  console.log(`Token: ${token}`);
  console.log(isLocked);

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.meta.requiresGuest && token) {
    next('/');
  } else if (isLocked && to.path !== '/lock-screen') {
    next('/lock-screen');
  } else {
    next();
  }
});


export default router;
