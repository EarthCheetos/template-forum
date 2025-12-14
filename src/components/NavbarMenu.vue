<template>
    <nav class="navbar">
        <div class="left">My App</div>

        <div class="right" v-if="user">
            <p>{{ user.first_name }} {{ user.last_name }}</p>

            <div class="dropdown">
                <button class="profile-btn" @click="toggle">
                    <img :src="user.img_user || defaultPic" class="avatar" />
                    <span>{{ user.username }}</span> ▼
                </button>

                <div class="menu" v-if="open">
                    <router-link to="/editprofile">Edit Profile</router-link>
                    <a @click="logout">Logout</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            user: null,
            open: false,
            defaultPic: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        };
    },

    mounted() {
        this.loadUser();
        window.addEventListener("storage", this.syncUser);
    },

    beforeUnmount() {
        window.removeEventListener("storage", this.syncUser);
    },

    methods: {
        loadUser() {
            try {
                const raw = localStorage.getItem("user");
                this.user = raw ? JSON.parse(raw) : null;
            } catch (e) {
                console.error("Invalid user JSON:", e);
                this.user = null;
            }
        },

        syncUser() {
            this.loadUser();
        },

        toggle() {
            this.open = !this.open;
        },

        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.user = null;
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #222;
    color: white;
}

.profile-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.dropdown {
    position: relative;
}

.menu {
    position: absolute;
    right: 0;
    background: white;
    padding: 10px;
    color: black;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
}

.menu a {
    cursor: pointer;
    margin: 5px 0;
}
</style>
