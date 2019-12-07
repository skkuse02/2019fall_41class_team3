<template>
  <div class="container">
    <div class="row">
      <div class="card mt-3" style = "overflow-y: auto;">
        <div class="card-body">
          <div class="card-title">
              <h3>Live Chatting</h3>
              <hr>
              {{question.title}}
              <br><br>
              {{question.content}}
              <hr>
              (starts at {{time}})
          </div>
          <div class="card-body overflow-auto" style="max-height:300px;">
            <div class="overflow-auto" id = "chatbody">
              <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><span class="font-weight-bold">{{ msg.user }} </span>{{ msg.message }}</p>
              </div>
            </div>
          </div>
      </div>
      <div class="card-footer">
          <form @submit.prevent="sendMessage">
              <div class="gorm-group pb-3">
                  <label for="message">Message:</label>
                  <input type="text" v-model="message" class="form-control">
              </div>
          </form>
      </div>
    </div>
      <div class="col-mt-9" style="margin-left: 20px">
          <div class="" style="margin-top:18px;">
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

    <button v-if="mentee" class="btn btn-success" style="margin-top: 20px;margin-bottom: 20px;" v-on:click="evaluate()"> Finish</button>
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
        cameraHeight: 150,
        user: '',
        message: '',
        messages: [],
        socket : io(''),
        mentee: false
      };
    },
    mounted: async function(){
      try{
        const user = await this.$http.get('/rest/user/session');
        this.user = user.data.user.uid;
        this.mentee = user.data.user.type == 'Mentee';
        try{
          const question = await this.$http.get('/rest/question/arranged/' + this.$route.query.qid, this.$route.query.room);
          this.question.title = question.data.question.title;
          this.question.content = question.data.question.content;
          this.time = question.data.arranged;
          this.roomId = this.$route.query.room;
          const messages = await this.$http.get('/rest/answer/message/' + this.$route.query.qid);
          this.messages = messages.data.messages;
         $('#chatbody').scrollTop = $('#chatbody').scrollHeight;
          this.socket.on('MESSAGE', (data) => {
          if(data.room == this.$route.query.room){
              data.user = data.user + ":";
              data.idx = this.messages.length;
              this.messages.push(data);
              $('#chatbody').scrollTop = $('#chatbody').scrollHeight;
          }
          });
          this.socket.on('ENTER', (data) => {
          if(data.room == this.$route.query.room){
              data.idx = this.messages.length;
              this.messages.push(data);
              $('#chatbody').scrollTop = $('#chatbody').scrollHeight;
          }
          });
          this.socket.emit('CONNECTION', {
              user: this.user,
              message: `has entered the chat room.`,
              room: this.$route.query.room
          });
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
            confirm("Are you sure your session is finished?");
            this.socket.emit('CONNECTION', {
                    user: this.user,
                    message: `has left the room.`,
                    room: this.$route.query.room
                });
            const res = await this.$http.post('/rest/answer/message/'+this.$route.query.qid, {messages: this.messages});
            
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
      sendMessage(e) {
          e.preventDefault();
          
          this.socket.emit('SEND_MESSAGE', {
              user: this.user,
              message: this.message,
              room: this.$route.query.room
          });
          this.message = ''
      }
    }
  };
</script>
