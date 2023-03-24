<template>
  <div class="home">
    <div>Right now, it's just a simple chat app, but keep checking in daily, and see what it becomes...</div>
    <div class="tagline">
      <div></div>
      <h1>Naji</h1>
      <div>Making strangers into friends</div>
    </div>
    <button @click="startChat">Start Chatting</button>
    <div class="online-user-count">People chatting now: {{ onlineUsers }}</div>
    <div class="bottom-align-div">
      <DiscordInviteButton inviteCode="https://discord.gg/GncrRGG3mX" />
    </div>

    
  </div>
</template>

<script>
import { backendURL } from "../../config";
import DiscordInviteButton from "./DiscordInviteButton.vue";

export default {

  data() {
    return {
      onlineUsers: 0,
    };
  },

  created() {
    this.fetchOnlineUsers();
    setInterval(() => {
      this.fetchOnlineUsers();
    }, 10000); // Update every 10 seconds
  },

  emits: ["start-chat"],

  components: {
    DiscordInviteButton,
  },

  methods: {
    async fetchOnlineUsers() {
      let backendURLProtocol = backendURL.replace("wss://", "https://");
      backendURLProtocol = backendURLProtocol.replace("ws://", "http://");
      try {
        const response = await fetch(backendURLProtocol + "/online-users");
        const data = await response.json();
        this.onlineUsers = data.onlineUsers;
      } catch (error) {
        console.error('Failed to fetch online users:', error);
      }
    },
  },

  setup(_, { emit }) {
    function startChat() {
      emit("start-chat");
    }

    return {
      startChat,
    };
  },
};
</script>
  
<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
}

.tagline {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bottom-align-div {
  position: absolute;
  bottom: 0;
  width: 100%;
 }

.online-user-count {
  margin-top: 10px;
  color: #7a7a7aa6;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

h1 {
  font-size: 5rem;
  margin: 20px;
}
</style>
  