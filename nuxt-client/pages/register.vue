<template>
    <div class="container top">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3>Register</h3>
                        <form @submit.prevent="registerUser">
                            <div class="form-group">
                                <label for="name" class="col-form-label text-md-right">Name</label>
                                <input type="text" class="form-control" v-model="userForm.name" required autofocus>
                                <span class="invalid-feedback" role="alert">
                                    <strong></strong>
                                </span>
                            </div>

                            <div class="form-group">
                                <label for="email" class="col-form-label text-md-right">Email</label>
                                <input type="email" class="form-control" v-model="userForm.email" required>
                                <span class="invalid-feedback" role="alert">
                                    <strong></strong>
                                </span>
                            </div>

                            <div class="form-group">
                                <label for="password" class="col-form-label text-md-right">Password</label>
                                <input type="password" class="form-control" v-model="userForm.password" required>
                                <span class="invalid-feedback" role="alert">
                                    <strong></strong>
                                </span>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-6">
                                    <button type="submit" class="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userForm: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async registerUser() {
                await this.$axios.post('register', this.userForm);
                this.$auth.login({
                    data: {
                        email: this.userForm.email,
                        password: this.userForm.password
                    }
                })
                this.$router.push({
                    path: '/'
                });
            }
        }
    }
</script>

<style>
    .top {
        margin-top: 80px;
    }
</style>
