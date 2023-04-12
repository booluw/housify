<template>
  <header
    class="flex justify-between items-center px-5 py-3 bg-secondary bg-opacity-70 md:px-20"
  >
    <router-link to="/">
      <i class="icofont-home text-primary text-3xl"></i>
    </router-link>
    <div class="w-2/3 flex items-center justify-end gap-5">
      <el-button icon="el-icon-user-solid" circle v-if="loggedIn" @click="goToDashboard()"></el-button>
      <button
        class="bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
        @click="loginModal = true"
        v-if="!loggedIn"
      > Log In </button>
      <button
        class="bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
        type="primary"
        @click="LogOut()"
        v-else
      > Log Out </button>
    </div>
    <log-in v-if="loginModal" @close="loginModal = false" @loggedIn="loggedIn = true; loginModal = false" />
  </header>
</template>

<script>
import { supabase } from "@/config/supabase";

export default {
  name: "AppHeader",
  components: {
    logIn: () => import ("@/components/Base/LogIn.vue")
  },
  data() {
    return {
      loginModal: false,
      loggedIn: false
    };
  },
  // computed: {
  //   loggedIn() {
  //     const user = localStorage.getItem("user");
  //     if (user) return true
  //     return false
  //   },
  // },
  methods: {
    goToDashboard() {
      const userData = JSON.parse(localStorage.getItem("_userData"))
      if (userData.account_type === 'admin') {
        this.$router.push("/admin")
      } else {
        this.$router.push("/landlord")
      }
    },
    async LogOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        this.$message.error(error)
      } else {
        localStorage.removeItem("user")
        this.$router.go("/")
      }
    }
  },
};
</script>
