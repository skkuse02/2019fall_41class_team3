<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="">
          <vue-webrtc ref="webrtc"
                      width="100%"
                      :roomId="roomId"
                      :socketURL="socketURL"
                      :enableVideo="enableVideo"
                      :enableAudio="enableAudio"
                      v-on:joined-room="logEvent"
                      v-on:left-room="logEvent"
                      v-on:open-room="logEvent"
                      v-on:share-started="logEvent"
                      v-on:share-stopped="logEvent"
                      @error="onError" />
        </div>
        <div class="row">
          <div class="col-md-12 my-3">
            <button type="button" class="btn btn-primary" @click="onJoin">Join</button>
            <button type="button" class="btn btn-primary" @click="onLeave">Leave</button>
            <button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>
            <button type="button" class="btn btn-primary" @click="onShareScreen">Share Screen</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h2>Captured Image</h2>
        <figure class="figure">
          <img :src="img" class="img-responsive" />
        </figure>
      </div>
    </div>
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
        enableVideo: false,
        question: {
                title: '',
                content: ''
        },
        time : null
      };
    },
    mounted: async function(){
      try{
        const user = await this.$http.get('/rest/user/session');
        this.user = user.data.user.uid;
      } catch(e){
        this.$router.push('/login');
      }
      try{
        const question = await this.$http.get('/rest/question/arranged/' + this.$route.query.qid, this.$route.query.room);
        this.question.title = question.data.question.title;
        this.question.content = question.data.question.content;
        this.time = question.data.arranged;
        this.roomId = this.$route.query.room;
        this.$refs.webrtc.join();
        this.img = this.$refs.webrtc.shareScreen();
      } catch(e){
            this.$router.go(-1);
      }
    },
    methods: {
      onCapture() {
        this.img = this.$refs.webrtc.capture();
      },
      onJoin() {
        this.$refs.webrtc.join();
      },
      onLeave() {
        this.$refs.webrtc.leave();
      },
      onShareScreen: async function() {

        this.img = this.$refs.webrtc.shareScreen();
      },
      onError(error, stream) {
        console.log('On Error Event', error, stream);
      },
      logEvent(event) {
        console.log('Event : ', event);
      },
    }
  };
</script>