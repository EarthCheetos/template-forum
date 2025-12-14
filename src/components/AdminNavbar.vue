<template>
  <nav class="navbar">
    <h2>Admin Dashboard</h2>

    <div class="nav-links">
      <button @click.prevent="userPage">Users</button>
      <button @click.prevent="postPage">Posts</button>
      <button class="logout" @click.prevent="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AdminNavbar",
  data(){
    return{
      user: JSON.parse(localStorage.getItem("admin")) || {},
      open: false,
    };
  },

  mounted(){
    window.addEventListener("storage", this.syncUser);
  },

  beforeUnmount(){
    window.removeEventListener("storage", this.syncUser);
  },
  methods: {
    userPage(){
      this.$router.push("/adminpage")
    },
    postPage(){
      this.$router.push("/adminpost")
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("admin")
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #222;
  color: white;
}

.nav-links button {
  margin-left: 10px;
  padding: 6px 10px;
  cursor: pointer;
}

.logout {
  background: red;
  color: white;
}
</style>