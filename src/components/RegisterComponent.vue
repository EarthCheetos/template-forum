<template>
    <div class="register-box">
        <h2>Register</h2>
        <form @submit.prevent="submitRegister">
            <p class="header-text">Choose your profile icon</p>
            <input type="file" @change="onFileChange" accept="image/*" /><br />
            <br />
            <img v-if="preview" :src="preview" style="width: 120px; height: 120px; border-radius: 50%;">
            <p class="header-text">First name</p>
            <input type="text" v-model="first_name" placeholder="First Name" class="input-box" required /><br />
            <p class="header-text">Last name</p>
            <input type="text" v-model="last_name" placeholder="Last Name" class="input-box" required /><br />
            <p class="header-text">Email</p>
            <input type="email" v-model="email" placeholder="Email" class="input-box" required /><br />
            <p class="header-text">Password</p>
            <input type="password" v-model="password" placeholder="Password" class="input-box" required /><br />
            <p class="header-text">Confirm Password</p>
            <input type="password" v-model="confirm_password" placeholder="Confirm your Password" class="input-box"
                required /><br />
            <button type="submit" class="btn-register">Register</button>
            <br />
            <h3>Already has an account?</h3>
            <a href="/">Click here</a>
        </form>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "RegisterComponent",
    data() {
        return {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            img_file: null,
            preview: null,
        };
    },
    methods: {
        async submitRegister() {
            try {
                const formData = new FormData();
                formData.append("email", this.email);
                formData.append("first_name", this.first_name);
                formData.append("last_name", this.last_name);
                formData.append("password", this.password);
                formData.append("confirm_password", this.confirm_password);
                formData.append("img_profile", this.img_profile);

                const res = await axios.post('/auth/register', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("Register successfully! Please log in", res.data);
                alert(res.data.message);
                this.$router.push('/');
            } catch (err) {
                console.error("Register error:", err.response?.data || err.message);
                alert(
                    err.response?.data?.message || "Register failed"
                );
            }
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.img_profile = file;
            this.preview = URL.createObjectURL(file);
        }
    },
};
</script>
<style scoped>
.header-text{
    text-align: left;
    border:none;
}
.btn-register {
    padding: 12px;
    width: 80%;
    background: #007bff;
    color: white;
    margin-top: 5px;
    border-radius: 5px;
    border: none;
    transition: background 0.3s ease, transform 0.2s ease-in-out;
}

.btn-register:hover{
    background: #218cff;
    transform: translateY(-2px);
}

.input-box {
    border-radius: 5px;
    margin-top: 5px;
    border: 1px solid gray;
    width: 80%;
    padding: 12px;
}

.register-box {
    width: 250px;
    margin: auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
    padding: 20px;
    background: #fff;
}

p {
    margin-top: 0.5px;
    margin-bottom: 0.5px;
}
</style>