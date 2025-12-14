<template>
  <div style="padding:20px">
    <AdminNavbar @change="toggle" />
    <h1>ADMIN PAGE WORKING ✅</h1>

    <h2>Admin - User Management</h2>

    <div v-if="loading">Loading...</div>

    <table v-else border="1" cellpadding="8" class="tables">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in users" :key="u.id_u">
          <td>{{ u.id_u }}</td>

          <td>
            <input v-model="u.first_name" placeholder="First Name" />
            <input v-model="u.last_name" placeholder="Last Name" />
          </td>

          <td><input v-model="u.email" /></td>

          <td>
            <button @click="saveUser(u)">Save</button>
            <button @click="deleteUser(u.id_u)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../services/api";
import AdminNavbar from "@/components/AdminNavbar.vue";

export default {
  components: {
    AdminNavbar
  },
  data() {
    return {
      users: [],
      loading: true,
    };
  },

  async mounted() {
    await this.loadUsers();
  },

  methods: {
    async loadUsers() {
      try {
        const res = await api.get("/users/userdata");
        this.users = res.data.data;
      } catch (err) {
        console.error("Couldn't load users:", err);
      } finally {
        this.loading = false;
      }
    },

    async saveUser(u) {
      try {
        await api.put(`/users/${u.id_u}`, {
          email: u.email,
          first_name: u.first_name,
          last_name: u.last_name,
        });

        alert("Saved!");
      } catch (err) {
        console.error("Save failed:", err);
      }
    },

    async deleteUser(id) {
      if (!confirm("Delete this user?")) return;

      try {
        await api.delete(`/users/${id}`);
        this.users = this.users.filter((u) => u.id_u !== id);
        
        alert("User deleted");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Delete error — check backend route.");
      }
    },

    toggle(tab) {
      console.log("Tab switched:", tab);
    },
  },
};
</script>

<style scoped>
.tables {
  justify-self: center;
}
</style>
