<template>
  <div>
    {{this.$store.state.socket.message.data}} <br/>
    <v-btn color="info"
           @mousedown="startButton('buttonUp')"
           @mouseup="stopButton('buttonUp')"
           @touchstart="startButton('buttonUp')"
           @touchend="stopButton('buttonUp')"
           style="height: 90px;" large>Omhoog</v-btn>
    <v-btn color="info"
           @mousedown="startButton('buttonDown')"
           @mouseup="stopButton('buttonDown')"
           @touchstart="startButton('buttonUp')"
           @touchend="stopButton('buttonUp')"
           style="height: 90px;" large>Omlaag</v-btn>
  </div>
</template>
<script>
  export default {
    name: 'Pong',
    data(){
      return {
        interval:false
      }
    },
    methods: {
      startButton(data){
        if(!this.interval){
          this.interval = setInterval(() => null, 30)
        }
        this.$socket.send(data.toString())
      },
      stopButton(data){
        clearInterval(this.interval);
        this.$socket.send("false");
        this.interval = false
      }
    }
  }
</script>
