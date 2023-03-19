<template>
  <div class="omegle-chat">
    <h1>Omegle Chat</h1>
    <div v-if="!connected && !searchButtonVisible" class="waiting-message">
      Searching for a user to connect you with...
    </div>
    <div v-if="showChatWindow" class="chat-window">
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
    <div v-if="connected" class="input-group">
      <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
    <button v-if="searchButtonVisible" @click="searchForAnotherChat">Search for another chat</button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "OmegleChat",

  setup() {
    const messages = ref([]);
    const inputMessage = ref("");
    const websocket = ref(null);
    const connected = ref(false);
    const showChatWindow = ref(false);
    const searchButtonVisible = ref(false);

    onMounted(() => {
      websocket.value = new WebSocket("ws://localhost:8080/ws");
      websocket.value.onmessage = (event) => {
        const messageData = JSON.parse(event.data);

        if (messageData.type === "status") {
          messages.value.push(messageData.text);
          if (messageData.text === "You are now connected with another user.") {
            connected.value = true;
            showChatWindow.value = true;
            searchButtonVisible.value = false; // Add this line
          } else if (messageData.text === "The other user has disconnected.") {
            connected.value = false;
            searchButtonVisible.value = true;
          }
        } else if (connected.value) {
          messages.value.push("Stranger: " + messageData.text);
        }
      };
    });

    onUnmounted(() => {
      if (websocket.value) {
        websocket.value.send(JSON.stringify({ type: "disconnect" }));
        websocket.value.close();
      }
    });

    function sendMessage() {
      if (inputMessage.value.trim() !== "") {
        const messageData = {
          type: "message",
          text: inputMessage.value.trim(),
        };

        websocket.value.send(JSON.stringify(messageData));
        inputMessage.value = "";
        messages.value.push("You: " + messageData.text);
      }
    }

    function searchForAnotherChat() {
      searchButtonVisible.value = false;
      showChatWindow.value = false;
      websocket.value.send(JSON.stringify({ type: "search_again" }));
    }

    return {
      messages,
      inputMessage,
      sendMessage,
      connected,
      searchButtonVisible,
      searchForAnotherChat,
      showChatWindow,
    };
  },
};
</script>


<style>
.client-message {
  background-color: #eee;
  margin-right: 50%;
  padding: 5px;
  border-radius: 5px;
}

.server-message {
  background-color: #2196f3;
  color: #fff;
  margin-left: 50%;
  padding: 5px;
  border-radius: 5px;
}

input[type="text"] {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
}
</style>
