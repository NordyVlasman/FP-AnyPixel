<template>

<nav class="navbar navbar-dark navbar-expand-sm bg-dark">
        <div class="container">
            <a class="navbar-brand" href="">
                Nuxt Laravel SPA
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <template v-if="!loggedIn">
                        <li class="nav-item">
                            <nuxt-link :to="{ name: 'login' }" class="nav-link">
                                Login
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link :to="{ name: 'register' }" class="nav-link">
                                Register
                            </nuxt-link>
                        </li>
                    </template>
                    <template v-if="loggedIn">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ user.name }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Edit profile</a>
                                <a class="dropdown-item" href="#">Check profile</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" @click.prevent="logout" href="#">Logout</a>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        methods: {
            logout() {
                this.$auth.logout();
            }
        }
    }
</script>