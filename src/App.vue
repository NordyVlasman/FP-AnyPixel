<template>
  <v-app id="inspire">
    <v-toolbar color="white" light>
      <v-spacer></v-spacer>
      <v-toolbar-title>FP Anypixel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
       </v-btn>

    </v-toolbar>
    <div class="headline text-xs-center pa-5">
      <div v-if="bottomNav === 'recent'">
        <div v-if="joinedGame !== null">
          <Pong :player="joinedGame" game="anypixel"/>
        </div>
        <div v-else>
          <v-btn color="info"
                 v-on:click="joinGame"
                 style="height: 90px;" large>Join game</v-btn>

        </div>
      </div>
      <div v-else-if="bottomNav === 'favorites'">
        <Hello/>
      </div>
      <div v-else>
        Hello world
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      Er is een nieuwe user
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">
      <v-btn color="blue" flat value="recent">
        <span>Pong</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn color="blue" flat value="favorites">
        <span>Hello world</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn color="blue" flat value="nearby">
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
    user_join: function(val) {
      this.joinedGame = val;
    },
    player_join: function() {
      this.snackbar = true;
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
      snackbar: false,
      color: '',
      mode: '',
      timeout: 6000,
      showDing: false,
    }
  },
  methods: {
    joinGame() {
      this.$socket.emit('join', { gameName: 'anypixel' });
    }
  }
}
</script>
