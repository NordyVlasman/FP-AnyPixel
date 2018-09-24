<template>
  <div>
    {{this.$store.state.socket}} <br/>
    <v-btn color="info" @mousedown="startUp" @mouseleave="stopUp" @mouseup="stopUp" @touchstart="startUp" @touchend="stopUp" @touchcancel="stopUp" style="height: 90px;" large>Omhoog</v-btn>
    <v-btn color="info" @mousedown="startDown" @mouseleave="stopDown" @mouseup="stopDown" @touchstart="startDown" @touchend="stopDown" @touchcancel="stopDown" style="height: 90px;" large>Omlaag</v-btn>
  </div>
</template>
<script>
  export default {
    name: 'Pong',
    data(){
      return {
        interval:false,
        count:0
      }
    },
    methods: {
      startUp(){
        if(!this.interval){
          this.interval = setInterval(() => this.$socket.send('buttonUp'), 30)
        }
      },
      stopUp(){
        clearInterval(this.interval)
        this.interval = false
      },

      startDown(){
        if(!this.interval){
          this.interval = setInterval(() => this.$socket.send('buttonDown'), 30)
        }
      },
      stopDown(){
        clearInterval(this.interval)
        this.interval = false
      },

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
