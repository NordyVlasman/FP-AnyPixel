<template>
  <div>
    {{this.$store.state.socket.message.data}} <br/>
    <v-btn color="info" v-on:click="addClick(true)" style="height: 90px;" large>Omhoog</v-btn>
    <v-btn color="info" v-on:click="addClick(false)" style="height: 90px;" large>Omlaag</v-btn>
  </div>
</template>
<script>
  export default {
    name: 'Pong',
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
