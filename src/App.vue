<template>
  <v-app id="inspire">
    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>AnyPixel.JS Friesepoort</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
    <div class="headline text-xs-center pa-5">
      <div v-if="bottomNav === 'recent'">
        <div v-if="joinedGame !== null">
          <Pong :player="joinedGame" game="anypixel"/>
        </div>
        <div v-else>
          <v-btn color="info"
                 v-on:click="joinGame"
                 style="height: 90px;" large>Omhoog</v-btn>
        </div>
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
<script>
import Pong from './components/Pong'
import Hello from "./components/HelloWorld"
export default {
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    'game joined': function(val) {
      this.joinedGame = val;
    }
  },
  components: {
      Hello,
      Pong
  },
  data () {
    return {
      bottomNav: 'recent',
      joinedGame: null,
    }
  },
  methods: {
    joinGame() {
      this.$socket.emit('join game', { gameName: 'anypixel' });
    }
  }
}
</script>
