<template>
  <div>
    <admin-navbar @change="toggle" />
    <h2>All Posts (Admin)</h2>

    <div v-if="posts.length === 0">No posts found</div>

    <div v-for="p in posts" :key="p.id">
      <b>By:{{ p.first_name }} {{ p.last_name }}</b>
      <p>{{ p.content }}</p>
    <small>{{ formatDate(p.created_at) }}</small><br />
      <button @click="editPost(p.id)">Edit</button>
      <button @click="deletePost(p.id)">Delete</button>
      <hr>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import AdminNavbar from '../components/AdminNavbar.vue';

export default {
  components: { AdminNavbar },
  data() {
    return { posts: [] };
  },
  async mounted() {
    try {
        const res = await api.get('/posts');
        console.log("ADMIN POST RESPONSE: ", res.data);
        this.posts = res.data.data;
    }catch (err){
        console.error("Couldn't load admin posts : ", err);
    }
  },
  methods: {
    formatDate(d) {
            return new Date(d).toLocaleString();
        },
    editPost(id) {
      this.$router.push(`/admineditpost/${id}`);
    },
    async deletePost(id) {
      try {
        if (!confirm("Delete this post?")) return;
        await api.delete(`/posts/admin/${id}`);
      this.posts = this.posts.filter(p => p.id !== id);
      }catch (err){
        console.error("Admin deletion failed :", err)
      }
    }
  }
}
</script>
