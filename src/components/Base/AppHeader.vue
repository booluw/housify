<template>
  <header
    class="flex justify-between items-center px-5 py-3 bg-secondary bg-opacity-70 md:px-20"
  >
    <router-link to="/">
      <i class="icofont-home text-primary text-3xl"></i>
    </router-link>
    <div class="w-2/3 flex items-center justify-end gap-5">
      <el-button
        type="primary"
        @click="loginModal = true"
        v-if="!loggedIn"
      > Log In </el-button>
    </div>
    <log-in v-if="loginModal" @close="loginModal = false" />
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  components: {
    logIn: () => import ("@/components/Base/LogIn.vue")
  },
  data() {
    return {
      loginModal: false,
    };
  },
  computed: {
    loggedIn() {
      const user = localStorage.getItem("user");
      if (user) return true
      return false
    }
  }
};
</script>
