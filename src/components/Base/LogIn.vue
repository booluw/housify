<template>
  <section
    class="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div
      class="w-full h-full md:h-auto md:w-1/3 p-5 md:p-10 bg-white md:rounded-xl"
    >
      <el-form v-if="action === 1" class="">
        <div
          class="flex items-center justify-between mb-3 border-secondary border-b pb-3"
        >
          <h1 class="text-3xl text-primary font-bold">Log In</h1>
          <i
            class="icofont-close-circled text-red-500 text-3xl cursor-pointer"
            @click="$emit('close')"
          ></i>
        </div>
        <el-form-item label="Email">
          <el-input
            type=""
            v-model="auth.email"
            placeholder="John.doe@company.mail"
          />
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="" v-model="auth.password" placeholder="Password" />
        </el-form-item>
        <button
          class="mt-3 w-full bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
          @click="logUserIn()"
          :disabled="submitting"
        >
          Log In
        </button>
        <p class="text-center text-sm mt-5">
          Don't have an account?
          <a
            href="#signup"
            @click.prevent="action = 2"
            class="text-primary underline"
            >Register</a
          >
        </p>
      </el-form>
      <el-form v-else class="">
        <div
          class="flex items-center justify-between mb-3 border-secondary border-b pb-3"
        >
          <h1 class="text-3xl text-primary font-bold">Register</h1>
          <i
            class="icofont-close-circled text-red-500 text-3xl cursor-pointer"
            @click="$emit('close')"
          ></i>
        </div>
        <el-form-item label="Name">
          <el-input
            type=""
            v-model="name"
            placeholder="John Doe"
          />
        </el-form-item>
        <el-form-item label="Email">
          <el-input
            type=""
            v-model="auth.email"
            placeholder="John.doe@company.mail"
          />
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="" v-model="auth.password" placeholder="Password" />
        </el-form-item>
        <el-form-item label="Your phone number">
          <el-input
            type=""
            v-model="phone"
            placeholder="0900000899384"
          />
        </el-form-item>
        <button
          class="mt-3 w-full bg-blue-500 text-white py-3 px-7 rounded-lg shadow"
          @click="RegisterUser()"
          :disabled="submitting"
        >
          Register
        </button>
        <p class="text-center text-sm mt-5">
          Registered already?
          <a
            href="#login"
            @click.prevent="action = 1"
            class="text-primary underline"
            >Log In</a
          >
        </p>
      </el-form>
    </div>
  </section>
</template>

<script>
import { login, register, addUser, fetchUser } from "@/services/auth.js";

export default {
  name: "LogIn",
  data() {
    return {
      auth: {
        email: "",
        password: "",
      },
      name: "",
      phone: "",
      submitting: false,
      action: 1,
    };
  },
  methods: {
    async logUserIn() {
      this.submitting = true;
      try {
        await login(this.auth);
        localStorage.setItem("user", this.auth.email)
        const user = await fetchUser(this.auth.email);
        localStorage.setItem("_userData", JSON.stringify(user[0]));
        if ((user[0]).account_type === "admin") {
          this.$router.replace("/admin")
        } else {
          this.$router.replace("/landlord")
        }
        this.$emit("loggedIn");
      } catch (error) {
        console.log(error);
        this.$message.error(error);
      }
      this.submitting = false;
    },
    async RegisterUser() {
      this.submitting = true;
      try {
        await register(this.auth);
        await addUser({ email: this.auth.email, name: this.name, phone: this.phone });
        this.$message.success("Account created, please log in")
        this.action = 1
      } catch (error) {
        console.log(error);
        this.$message.error(error);
      }
      this.submitting = false;
    },
  },
};
</script>
