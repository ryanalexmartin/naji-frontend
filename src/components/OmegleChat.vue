<template>
  <div class="omegle-chat">
    <h1>Omegle Chat</h1>
    <div v-if="!connected && !searchButtonVisible" class="waiting-message">
      Searching for a user to connect you with...
    </div>
    <div v-if="showChatWindow" class="chat-window">
      <ul>
        <li v-for="(message, index) in messages" :key="index" :set="message = JSON.parse(message)">
          <div v-if="message.sender === 'system'">

            <!-- Horizontal Flexbox defined below -->
            <div v-if="message.sender === 'system'">
              <div> {{ message.message }} </div>
            </div>

            <div v-if="message.sender === 'Stranger'" class="client-message">
              {{ message.message }}
            </div>
            <div v-if="message.sender === 'You'" class="server-message">
              {{ message.message }}
            </div>
          </div>
          <div v-if="message.sender === 'Stranger'" class="client-message">
            {{ message.message }}
          </div>
          <div v-if="message.sender === 'You'" class="server-message">
            {{ message.message }}
          </div>
        </li>
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
      initializeWebSocket();
    });

    onUnmounted(() => {
      if (websocket.value) {
        websocket.value.send(JSON.stringify({ type: "disconnect" }));
        websocket.value.close();
      }
    });

    function initializeWebSocket() {
      websocket.value = new WebSocket("ws://localhost:8080/ws");
      websocket.value.onmessage = (event) => {
        const messageData = JSON.parse(event.data);

        if (messageData.type === "status") {
          messages.value.push(JSON.stringify({ "sender": "system", "message": messageData.text }));
          if (messageData.text === "You are now connected with another user.") {
            connected.value = true;
            showChatWindow.value = true;
            searchButtonVisible.value = false;
          } else if (messageData.text === "The other user has disconnected.") {
            connected.value = false;
            searchButtonVisible.value = true;
          }
        } else if (connected.value) {
          messages.value.push(JSON.stringify({ "sender": "Stranger", "message": messageData.text }));
        }
      };
    }

    function sendMessage() {
      if (inputMessage.value.trim() !== "") {
        const messageData = {
          type: "message",
          text: inputMessage.value.trim(),
        };

        websocket.value.send(JSON.stringify(messageData));
        inputMessage.value = "";
        messages.value.push(JSON.stringify({ "sender": "You", "message": messageData.text }));
      }
    }

    function searchForAnotherChat() {
      messages.value = [];
      searchButtonVisible.value = false;
      showChatWindow.value = false;
      initializeWebSocket();
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
  margin-right: 20%;
  padding: 5px;
  border-radius: 5px;
}

.server-message {
  background-color: #2196f3;
  color: #fff;
  margin-left: 20%;
  padding: 5px;
  border-radius: 5px;
}

.horizontal-flexbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.system-message {
  background-color: #eee;
  padding: 10px;
  border-radius: 5px;
}

li {
  /* styles all li elements*/
  list-style-type: none;
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
