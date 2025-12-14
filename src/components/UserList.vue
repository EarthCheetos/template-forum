<template>
  <div>
    <h3>Users List</h3>

    <table border="1" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Profile</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in users" :key="u.id_u">
          <td>{{ u.id_u }}</td>

          <td>
            <img
              v-if="u.img_profile"
              :src="`http://192.168.10.49:3001${u.img_profile}`"
              width="40"
            />
          </td>

          <td>{{ u.first_name }} {{ u.last_name }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserList",

  data() {
    return {
      users: [],
    };
  },

  async created() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://192.168.10.49:3001/user/userdata",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.users = res.data.data;
    } catch (err) {
      console.error("Load users error:", err);
    }
  },
};
</script>