import { createRouter, createWebHistory } from "vue-router";

import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import MainPage from "@/components/MainPage.vue";
import EditProfile from "@/components/EditProfile.vue";
import AdminPage from "@/admin/AdminPage.vue";
import CreatePost from "@/components/CreatePost.vue";
import EditPost from "@/components/EditPost.vue";
import EditUser from "@/admin/EditUser.vue";
import AdminPost from "@/admin/AdminPost.vue";
import AdminEditPost from "@/admin/AdminEditPost.vue";
const routes = [
    { path: "/", component: LoginComponent },
    { path: "/register", component: RegisterComponent },
    { path: "/mainpage", component: MainPage, meta: {requiresAuth: true} },
    { path: "/editprofile", name: "editProfile", component: EditProfile, meta: {requiresAuth: true }},
    { path: "/adminpage", component: AdminPage},
    { path: "/createpost", component: CreatePost},
    { path: "/editpost/:id", component: EditPost},
    { path: "/edituser/", component: EditUser},
    { path: "/adminpost", component: AdminPost},
    { path: "/admineditpost/:id", component: AdminEditPost}
];  

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;