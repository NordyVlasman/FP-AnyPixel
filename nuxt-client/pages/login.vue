<template>
    <div class="container top">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3>Login</h3>
                        <form @submit.prevent="addUser">
                            <div class="form-group">
                                <label for="email" class="col-form-label">Email</label>
                                    <input type="email" v-model="userForm.email" class="form-control" required autofocus>
                                    <span class="invalid-feedback" role="alert">
                                        <strong></strong>
                                    </span>
                            </div>

                            <div class="form-group">
                                <label for="password" class=" col-form-label text-md-right">Password</label>
                                <input type="password" v-model="userForm.password" class="form-control" required>
                                <span class="invalid-feedback" role="alert">
                                        <strong></strong>
                                </span>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8">
                                    <button type="submit" class="btn btn-primary">
                                        Login
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
                    email: '',
                    password: ''
                },
                error: ''
            }
        },
        methods: {
            async addUser() {
                await this.$auth.login({
                    data: this.userForm
                }).catch(e => {
                    console.log(e);
                    this.error = e.status;
                });
                // this.$router.push({
                //     path: '/'
                // });
            }
        }
    }
</script>

<style>
    .top {
        margin-top: 80px;
    }
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10), 0 6px 20px 0 rgba(0, 0, 0, 0.10);
    }
</style>
