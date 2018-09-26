<template>
  <div>
    Je bent speler: {{ user.num }}
    <br/>
    <v-btn color="info btnHeight"
           @mousedown="startButton('buttonUp')"
           @mouseup="stopButton('buttonUp')"
           @touchstart="startButton('buttonUp')"
           @touchend="stopButton('buttonUp')"
           large>Omhoog</v-btn>
    <v-btn color="info btnHeight"
           @mousedown="startButton('buttonDown')"
           @mouseup="stopButton('buttonDown')"
           @touchstart="startButton('buttonDown')"
           @touchend="stopButton('buttonDown')"
           large>Omlaag</v-btn>
  </div>
</template>
<script>
  export default {
    name: 'Pong',
    props: {
      player: {
        type: Object,
        required: true
      },
      game: {
        type: String,
        required: true
      }
    },
    data(){
      return {
        interval:false,
        gameName: this.game,
        user: this.player
      }
    },
    methods: {
      startButton(data){
        if(!this.interval){
          this.interval = setInterval(() => null, 30)
        }
        this.$socket.emit(data, { gameName: "anypixel",user: this.user.num.toString() });
      },
      stopButton(data){
        clearInterval(this.interval);
        this.$socket.emit("false", { gameName: "anypixel",user: this.user.num.toString() });
        this.interval = false
      }
    }
  }
</script>
<style>
  .btnHeight {
    height: 96px;
  }
</style>
