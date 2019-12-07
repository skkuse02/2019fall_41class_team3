<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="" style="margin-top:20px;">
            <vue-webrtc ref="webrtc"
                        width="10%"
                        :roomId="roomId"
                        :socketURL="socketURL"
                        :enableVideo="enableVideo"
                        :enableAudio="enableAudio"
                        :cameraHeight="cameraHeight"
                        v-on:joined-room="onLeave"
                        v-on:left-room="logEvent"
                        v-on:open-room="logEvent"
                        v-on:share-started="logEvent"
                        v-on:share-stopped="logEvent"
                        @error="onError" />
      
        </div>
      </div>
    </div>
    <button class="btn btn-success" style="margin-top: 20px;" v-on:click="evaluate()"> Finish</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { WebRTC } from 'vue-webrtc';
  import { find, head } from 'lodash';
  import * as io from 'socket.io-client';

  window.io = io;
  Vue.component(WebRTC.name, WebRTC);

  export default {
    name: 'app',
    components: {
    },
    data() {
      return {
        img: null,
        roomId: '',
        socketURL: 'https://rtcmulticonnection.herokuapp.com:443/',
        enableAudio: true,
        enableVideo: true,
        question: {
                title: '',
                content: ''
        },
        time : null,
        cameraHeight: 200
      };
    },
    mounted: async function(){
      try{
        const user = await this.$http.get('/rest/user/session');
        this.user = user.data.user.uid;
  
        try{
          const question = await this.$http.get('/rest/question/arranged/' + this.$route.query.qid, this.$route.query.room);
          this.question.title = question.data.question.title;
          this.question.content = question.data.question.content;
          this.time = question.data.arranged;
          this.roomId = this.$route.query.room;
          this.onJoin();
          this.onShareScreen();
        } catch(e){
          alert(e);
              this.$router.go(-1);
        }
      } catch(e){
        this.$router.push('/login');
      }
    },
    methods: {
      evaluate: async function(){
        try{
            confirm("Are you sure your chat session is finished?");
            this.$router.push('/answer/evaluate/'+this.$route.query.qid);
        } catch(e){
            console.log(e);
            alert("An error has occured");
        }
      },
      onJoin() {
        this.$refs.webrtc.join();
      },
      onLeave() {
         console.log(this.$refs.webrtc);
        //this.$refs.webrtc.leave();
      },
      onShareScreen: async function() {
        this.img = this.$refs.webrtc.shareScreen();
      },
      onError(error, stream) {
        console.log('On Error Event', error, stream);
      },
      logEvent(event) {

        console.log(this.$refs.webrtc);
        console.log('Event : ', event);
      },
    }
  };
</script>

<style scoped>
  .video-item{
    margin-right: 33%
  }
</style>