<template>
    <div class="post-box">
        <form @submit.prevent="createPost">
            <textarea v-model="content" placeholder="Write something..."></textarea>
            <button class="btn-post">Create post</button>
            
        </form>
        <button @click.prevent="cancel" class="btn-cancel">Cancel</button>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "CreatePost",
    data() {
        return {
            content: ""
        };
    },
    methods: {
        async createPost() {
            if (!this.content.trim()) {
                alert("Post content is empty");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                await axios.post(
                    "/posts",
                    { content: this.content },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                this.content = "";
                this.$emit("refresh");
            } catch (err) {
                alert("Create post failed");
                console.error(err);
            }
        },
        cancel(){
            this.$router.push('/mainpage');
        }
    },
};
</script>
<style scoped>
.post-box {
    width: 260px;
    margin: 80px auto;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #ddd;
    background: #fff;
}

.btn-post{
    border: none;
    color: white;
    background: rgb(49, 104, 244);
    width: 100%;
    margin: 5px;
    border-radius: 5px;
}
.btn-cancel{
    border: none;
    color: white;
    background: rgb(136, 0, 0);
    width: 100%;
    margin: 5px;
    border-radius: 5px;
}
</style>