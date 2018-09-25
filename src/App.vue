<template>
  <v-app id="inspire">
    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>AnyPixel.JS Friesepoort</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
      <div class="headline text-xs-center pa-5">
        <div v-if="bottomNav === 'recent'">
          <Pong/>
        </div>
        <div v-else-if="bottomNav === 'favorites'">
          <Hello/>
        </div>
        <div v-else>
          Hello world
        </div>
      </div>
      <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">
        <v-btn color="teal" flat value="recent">
          <span>Pong</span>
          <v-icon>history</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="favorites">
          <span>Hello world</span>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="nearby">
          <span>Test</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
  </v-app>
</template>

<style lang="scss" scoped>
  body {
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
</style>

<script>
  import Pong from './components/Pong'
  import Hello from "./components/Hello"
  export default {
    name: 'Normal',
    components: {
      Hello,
      Pong
    },
    data () {
      return {
        bottomNav: 'recent',
      }
  },
  methods: {
      addClick: function (up) {
        if(!this.$store.state.socket.isConnected)
          return;

        if(up === true) {
          this.$socket.send('buttonUp');
        } else {
          this.$socket.send('buttonDown');
        }
      }
    }
  }
</script>
