<template>
  <v-app id="inspire">
    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
      <div class="headline text-xs-center pa-5">
        Active: {{ bottomNav }}<br/>
        <v-btn color="info" v-on:click="addClick">Volgende</v-btn>
      </div>
      <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">
        <v-btn color="teal" flat value="recent">
          <span>Recent</span>
          <v-icon>history</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="favorites">
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="nearby">
          <span>Nearby</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
  </v-app>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    name: 'Normal',
    data () {
      return {
        bottomNav: 'recent'
      }
  },
  methods: {
      addClick: function () {
        this.$socket.send('click');
        console.log('Hier is geklikt');
      }
    }
  }
</script>
