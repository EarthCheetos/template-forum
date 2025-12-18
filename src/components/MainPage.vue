<template>

    <div>
        <NavbarMenu />
        <h2>Forum</h2>
        <button @click="createPost" class="create-post">Create Post</button><br />

        <div class="forum-box">
            <div v-if="posts.length === 0">
                No posts
            </div>

            <div v-for="p in posts" :key="p.id" class="post">
                <b>{{ p.first_name || 'You' }} {{ p.last_name || '' }}</b>
                <p>{{ p.content }}</p>
                <small>{{ formatDate(p.created_at) }}</small><br />

                <div v-if="Number(p.user_id) === Number(user.id)">
                    <button @click="editPost(p)" class="btn-post">Edit Post</button>
                    <button @click="deletePost(p.id)" class="btn-delete">Delete Post</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../services/api.js";
import NavbarMenu from "./NavbarMenu.vue";

export default {
    components: { NavbarMenu },
    data() {
        return {
            posts: [],
            user: (() => {
                try {
                    const raw = localStorage.getItem("user");
                    const u = raw ? JSON.parse(raw) : {};
                    return { ...u, id: Number(u.id) };
                } catch (e) {
                    console.error("Bad user JSON:", e);
                    return { id: 0 };
                }
            })(),

        };
    },

    async mounted() {
        try {
            const res = await api.get("/posts");
            this.posts = res.data.data;
        } catch (err) {
            console.error("Load posts error:", err);
        }
    },

    methods: {
        createPost() {
            this.$router.push("/createpost");
        },

        formatDate(d) {
            return new Date(d).toLocaleString();
        },

        editPost(post) {
            this.$router.push(`/editpost/${post.id}`);
        },

        async deletePost(id) {
            if (!confirm("Delete this post?")) return;

            try {
                await api.delete(`/posts/${id}`);
                this.posts = this.posts.filter(p => p.id !== id);
            } catch (err) {
                console.error("Delete error:", err);
            }
        },
    },
};
</script>

<style scoped>
.forum-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
}

.post {
    padding: 20px;
    border: 1px solid #ddd;
    background: #fff;
    width: 260px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.btn-post {
    border: none;
    color: white;
    background: rgb(5, 123, 192);
    margin: 5px;
    border-radius: 5px;
    width: 100%;
}

.btn-delete {
    border: none;
    color: white;
    background: rgb(192, 5, 5);
    margin: 5px;
    border-radius: 5px;
    width: 100%;
}

.create-post {
    border: none;
    color: white;
    background: rgb(0, 132, 255);
    border-radius: 5px;
    padding: 12px;
}
</style>
