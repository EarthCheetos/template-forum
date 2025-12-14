<template>
  <div class="login-box">
    <h2>Login</h2>

    <form @submit.prevent="submitLogin">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="input-box"
        required
      />

      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="input-box"
        required
      />

      <button type="submit" class="btn-login">Login</button>

      <p>Don't have an account yet?</p>
      <a @click.prevent="goRegister" href="#">Click here</a>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },

    async submitLogin() {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        const res = await axios.post("/auth/login", {
          email: this.email,
          password: this.password
        });


        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.profile));
        localStorage.setItem("role", res.data.profile.role);

        if (res.data.profile.role === "admin") {
          this.$router.push("/adminpage");
        } else {
          this.$router.push("/mainpage");
        } 

      } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Login failed");
      }
    }
  }
};
</script>

<style scoped>
.login-box {
  width: 260px;
  margin: 80px auto;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #fff;
}

.input-box {
  margin-top: 10px;
  width: 80%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 15px;
}

.input-box:focus {
  border-color: #007bff;
  outline: none;
}

.btn-login {
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  background: #007bff;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
}

.btn-login:hover {
  background: #1e88ff;
}

a {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}
</style>