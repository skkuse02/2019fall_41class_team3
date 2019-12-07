<template>
  <div class="card mt-3">
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
          <div class="card-body">
              <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><span class="font-weight-bold">{{ msg.user }} </span>{{ msg.message }}</p>
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
          <button class="btn btn-success" v-on:click="evaluate()"> Finish</button>
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            socket : io(''),
            question: {
                title: '',
                content: ''
            },
            time : null
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
            
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message,
                room: this.$route.query.room
            });
            this.message = ''
        },
        evaluate: async function(){
            try{
                confirm("Are you sure your chat session is finished?");
                const res = await this.$http.post('/rest/answer/message/'+this.$route.query.qid, {messages: this.messages});
                this.$router.push('/answer/evaluate/'+this.$route.query.qid);
            } catch(e){
                console.log(e);
                alert("An error has occured");
            }
        }
    },
    mounted: async function (){
        try{
            const user = await this.$http.get('/rest/user/session');
            this.user = user.data.user.uid;
            try{
                const question = await this.$http.get('/rest/question/arranged/' + this.$route.query.qid, this.$route.query.room);
                this.question.title = question.data.question.title;
                this.question.content = question.data.question.content;
                this.time = question.data.arranged;

                const messages = await this.$http.get('/rest/answer/message/' + this.$route.query.qid);
                this.messages = messages.data.messages;

                this.socket.on('MESSAGE', (data) => {
                if(data.room == this.$route.query.room){
                    data.user = data.user + ":";
                    data.idx = this.messages.length;
                    this.messages.push(data);
                }
                });
                this.socket.on('ENTER', (data) => {
                if(data.room == this.$route.query.room){
                    data.idx = this.messages.length;
                    this.messages.push(data);
                }
                });
                this.socket.emit('CONNECTION', {
                    user: this.user,
                    message: ` has entered the chat room.`,
                    room: this.$route.query.room
                });
            } catch(e){
                this.$router.go(-1);
            }
        }catch(e){
            this.$router.push('/login');
        }
    }
}
</script>