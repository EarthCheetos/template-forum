<template>
    <div style="padding: 20px;">
        <h2>Edit Profile</h2>

        <form @submit.prevent="updateProfile">
            <div>
                <label>Username:</label>
                <input type="text" v-model="editUser.username" required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" v-model="password" placeholder="Leave blank to keep the current password" />
            </div>
            <div>
                <label>Profile Image:</label>
                <input type="file" @change="onFileChange" />
                <div v-if="previewImage">
                    <p>Preview:</p>
                    <img :src="imgUrl" class="avatar" />
                </div>
            </div>
            <button type="submit">Update</button>
            <button type="button" @click="cancelEdit">Cancel</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "EditProfile",


    data() {
        return {
            editUser: JSON.parse(localStorage.getItem("editUser")) || {},   // FIXED NAME
            password: "",
            file: null,
            previewImage: null,
        };
    },

    computed: {
        imgUrl() {
            if (this.previewImage) return this.previewImage; // preview first
            if (!this.editUser.img_user) return this.defaultPic;

            return `http://192.168.10.49:3000/image/${this.editUser.img_user}`;
        }
    },
    methods: {
        onFileChange(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                this.file = selectedFile;
                this.previewImage = URL.createObjectURL(selectedFile);
            }
        },
        async updateProfile() {
            try {
                const token = localStorage.getItem("token");


                const payload = {
                    username: this.editUser.username,
                    password: this.password,
                };

                await axios.put(
                    `http://192.168.10.49:3000/api/auth/updateuser/${this.editUser.id_u}`,
                    payload,
                    { headers: { jwt: token } }
                );
                if (this.file) {
                    const formData = new FormData();
                    formData.append("image", this.file);

                    const res = await axios.put(
                        `http://192.168.10.49:3000/api/auth/upload/${this.editUser.id_u}`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                jwt: token,
                            },
                        }
                    );
                    console.log("Upload response:", res.data);
                    this.editUser.img_user = res.data.image;
                    localStorage.setItem("user", JSON.stringify(this.editUser));
                    const updatedUser = await axios.get(
                        `http://192.168.10.49:3000/api/auth/user/${this.editUser.id_u}`,
                        { headers: { jwt: token } }
                    );
                    localStorage.setItem("user", JSON.stringify(updatedUser.data.data));
                }
                alert("Profile updated successfully!");
                localStorage.removeItem("editUser");
                this.$router.push("/user");
            }
            catch (err) {
                console.error(err.response?.data || err.message);
                alert("Failed to update profile");
            }
        },

        cancelEdit() {
            localStorage.removeItem("editUser");
            this.$router.push("/mainpage");
        },

    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
}

label {
    font-weight: bold;
}

input {
    padding: 5px;
    font-size: 1rem;
}

button {
    width: 120px;
    padding: 5px;
    margin-top: 10px;
}
</style>