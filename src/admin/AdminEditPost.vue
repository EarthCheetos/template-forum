<template>
    <div style="padding: 20px; max-width: 600px; margin: auto;">
        <h2>Edit Post (Admin)</h2>

        <div v-if="loading">Loading...</div>

        <form v-if="!loading" @submit.prevent="updatePost">
            <div style="margin-bottom: 10px;">
                <label>User:</label>
                <input type="text" :value="postUser" disabled class="input-box" />
            </div>

            <div style="margin-bottom: 10px;">
                <label>Content:</label>
                <textarea v-model="form.content" class="input-box" rows="5"></textarea>
            </div>

            <button class="btn-save" type="submit">Save Changes</button>
            <button class="btn-back" @click="goBack" type="button">Back</button>
        </form>
    </div>
</template>

<script>
import api from "../services/api";

export default {
    data() {
        return {
            loading: true,
            form: { content: "" },
            postUser: "",
            post: null
        };
    },

    async mounted() {
        await this.loadPost();
    },

    methods: {
        async loadPost() {
            try {
                const id = this.$route.params.id;

                const res = await api.get(`/posts/admin/${id}`);

                console.log("POST DATA:", res.data.data);

                const post = res.data.data;

                this.post = post;
                this.form.content = post.content;
                this.postUser = `${post.first_name} ${post.last_name}`;

            } catch (err) {
                console.error("Load post error:", err);
                alert("Post not found");
            } finally {
                this.loading = false;
            }
        },


        async updatePost() {
            try {
                const id = this.$route.params.id;

                await api.put(`/posts/admin/${id}`, this.form);

                alert("Post updated successfully!");

                this.$router.push("/adminpost");

            } catch (err) {
                console.error("Update error:", err);
                alert("Failed to update post");
            }
        },

        goBack() {
            this.$router.back();
        }
    }
};
</script>

<style scoped>
.input-box {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.btn-save {
    padding: 10px;
    width: 100%;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    margin-top: 10px;
}

.btn-back {
    padding: 10px;
    width: 100%;
    background: #555;
    color: white;
    border: none;
    border-radius: 6px;
    margin-top: 10px;
}
</style>
