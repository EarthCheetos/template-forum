<template>
  <div>
    <h3>All Posts</h3>

    <table border="1" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Content</th>
          <th>Image</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in posts" :key="p.id_post">
          <td>{{ p.id_post }}</td>
          <td>{{ p.user_name }}</td>
          <td>{{ p.content }}</td>

          <td>
            <img
              v-if="p.image"
              :src="`http://192.168.10.49:3001${p.image}`"
              width="60"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostList",

  data() {
    return {
      posts: [],
    };
  },

  async created() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://192.168.10.49:3001/post/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.posts = res.data.data;
    } catch (err) {
      console.error("Load posts error:", err);
    }
  },
};
</script>