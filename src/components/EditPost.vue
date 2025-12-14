<template>
  <div>
    <h2>Edit Post</h2>

    <div v-if="loading">Loading...</div>

    <div v-else-if="!post">
      Post not found.
    </div>

    <div v-else>
      <textarea v-model="post.content" rows="6"></textarea><br />

      <button @click="updatePost">Save Changes</button>
      <button @click="$router.push('/mainpage')">Cancel</button>
    </div>
  </div>
</template>

<script>
import api from "../services/api.js";

export default {
  data() {
    return {
      post: null,
      loading: true,
      user: null,
    };
  },

  async mounted() {
    const raw = localStorage.getItem("user");
    if (!raw) {
      this.$router.push("/login");
      return;
    }

    this.user = JSON.parse(raw);

    await this.loadPost();
  },

  methods: {
    async loadPost() {
      try {
        const id = this.$route.params.id;

        const res = await api.get(`/posts/${id}`);
        this.post = res.data.data;

        // Check owner
        if (Number(this.post.user_id) !== Number(this.user.id)) {
          alert("You don't have permission to edit this post.");
          this.$router.push("/mainpage");
          return;
        }

      } catch (err) {
        console.error("Load post error:", err);
        this.post = null;
      } finally {
        this.loading = false;
      }
    },

    async updatePost() {
      try {
        await api.put(`/posts/${this.post.id}`, {
          content: this.post.content,
        });

        alert("Post updated!");

        // ⬇️ Redirect to /mainpage after update
        this.$router.push("/mainpage");

      } catch (err) {
        console.error("Update error:", err);
        alert("Failed to update.");
      }
    },
  },
};
</script>
