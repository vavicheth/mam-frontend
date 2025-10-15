import { createRouter, createWebHistory } from "vue-router";


import EventsListPage from "../pages/Events/EventsListPage.vue";

import SettingsPage from "../pages/Social/SettingsPage.vue";

import TeamMembersPage from "../pages/Users/TeamMembersPage.vue";
import UsersListPage from "../pages/Users/UsersListPage.vue";
import AddUserPage from "../pages/Users/AddUserPage.vue";
import UserProfilePage from "../pages/Profile/UserProfilePage.vue";
import UserTeamPage from "../pages/Profile/UserTeamPage.vue";
import UserProjectsPage from "../pages/Profile/UserProjectsPage.vue";
import StarterPage from "../pages/StarterPage.vue";
import SignInPage from "../pages/Authentication/SignInPage.vue";

import SignUpPage from "../pages/Authentication/SignUpPage.vue";

import LockScreenPage from "../pages/Authentication/LockScreenPage.vue";
import LogOutPage from "../pages/Authentication/LogOutPage.vue";

import MyProfilePage from "../pages/MyProfilePage.vue";

import TestPage from "../components/Pages/Test/TestPage.vue"


import ErrorPage from "../pages/ErrorPage.vue";
import DashboardPage from "@/pages/Dashboard/DashboardPage.vue";
import StaffListPage from "@/pages/Staff/StaffListPage.vue";
import LoginPage from "@/pages/Authentication/LoginPage.vue";
import DepartmentsListPage from "@/pages/Departments/DepartmentsListPage.vue";
import DepartmentViewPage from "@/pages/Departments/DepartmentViewPage.vue";

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
    path: "/staff",
    name: "StaffListPage",
    component: StaffListPage,
  },
  {
    path: "/departments",
    name: "DepartmentListPage",
    component: DepartmentsListPage,
    children: [
      {
        path: "/departments/:departmentId",
        name: "DepartmentViewPage",
        component: DepartmentViewPage,
      },

    ]
  },

  {
    path: "/users",
    name: "UserListPage",
    component: UsersListPage,
  },


  {
    path: "/starter",
    name: "StarterPage",
    component: StarterPage,
  },

  {
    path: "/users/team-members",
    name: "TeamMembersPage",
    component: TeamMembersPage,
  },
  {
    path: "/users/users-list",
    name: "UsersListPage",
    component: UsersListPage,
  },
  {
    path: "/users/add-user",
    name: "AddUserPage",
    component: AddUserPage,
  },
  {
    path: "/profile/user-profile",
    name: "UserProfilePage",
    component: UserProfilePage,
  },
  {
    path: "/profile/profile-teams",
    name: "UserTeamPage",
    component: UserTeamPage,
  },
  {
    path: "/profile/profile-projects",
    name: "UserProjectsPage",
    component: UserProjectsPage,
  },

  {
    path: "/my-profile",
    name: "MyProfilePage",
    component: MyProfilePage,
  },

  {
    path: "/social/settings",
    name: "SettingsPage",
    component: SettingsPage,
  },
  {
    path: "/authentication/sign-in",
    name: "SignInPage",
    component: SignInPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/authentication/sign-up",
    name: "SignUpPage",
    component: SignUpPage,
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
  const token = localStorage.getItem('token');
  const isLocked = localStorage.getItem('isLocked') === 'true';

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.meta.requiresGuest && token) {
    next('/dashboard');
  } else if (isLocked && to.path !== '/lock') {
    next('/lock-screen');
  } else {
    next();
  }
});


export default router;
