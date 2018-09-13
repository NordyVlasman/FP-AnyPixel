<template>
  <div class="container container-fluid">
    <div class="jumbotron" v-if="loggedIn">
      <h1 class="display-4">Welcome {{ user.name }}</h1>
      <p class="lead">Nuxt laravel spa is an starter pack for Laravel 5.7 with nuxt.</p>
      <hr class="my-4" />
      <p>For more information, check out my github.</p>
      <a class="btn btn-primary btn-lg" href="https://github.com/NordyVlasman/Laravel-Nuxt-SPA/tree/master/nuxt-client" role="button">Learn more</a>
    </div>

    <div class="jumbotron" v-if="!loggedIn">
      <h1 class="display-4">Nuxt Laravel SPA</h1>
        <p class="lead">Nuxt laravel spa is an starter pack for Laravel 5.7 with nuxt.</p>
        <hr class="my-4" />
        <p>For more information, check out my github.</p>
        <a class="btn btn-primary btn-lg" href="https://github.com/NordyVlasman/Laravel-Nuxt-SPA/tree/master/nuxt-client" role="button">Learn more</a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style>
  .jumbotron {
      margin-top: 10px !important;
  }
</style>