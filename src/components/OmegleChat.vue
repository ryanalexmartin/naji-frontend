<template>
  <div class="container">
    <div class="omegle-chat">
      <h1>Omegle Chat</h1>
      <div v-if="!connected && !searchButtonVisible && waitingMessageVisible" class="waiting-message">
        Searching for a user to connect you with...
      </div>
      <div v-if="showChatWindow" class="chat-window">
        <ul>
          <li v-for="(message, index) in messages" :key="index" :set="message = JSON.parse(message)">
            <div v-if="message.sender === 'system'">
              {{ message.message }}
            </div>
            <div v-if="message.sender === 'Stranger'" class="message-container">
              <div class="spacer"></div>
              <div class="client-message">
                {{ message.message }}
              </div>
            </div>
            <div v-if="message.sender === 'You'" class="message-container">
              <div class="server-message">
                {{ message.message }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="connected" class="input-group">
        <div class="input-group">
          <button class="end-chat-button" @click="endChat">{{ endChatText }}</button>
          <div class="input-wrapper">
            <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
            <i class="fas fa-paper-plane" @click="sendMessage"></i>
          </div>
        </div>

      </div>
      <button v-if="searchButtonVisible" @click="searchForAnotherChat">Search for another chat</button>
    </div>
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
    const endChatText = ref("End Chat");
    const waitingMessageVisible = ref(true);

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

    function endChat() {
      if (endChatText.value === "End Chat") {
        endChatText.value = "Are you sure you want to end this chat?";
      } else if (endChatText.value === "Are you sure you want to end this chat?") {
        // Handle ending the chat
        messages.value.push(JSON.stringify({ "sender": "system", "message": "You have ended the chat." }));
        connected.value = false;
        waitingMessageVisible.value = false; // Add this line

        websocket.value.send(JSON.stringify({ type: "disconnect" }));
        searchButtonVisible.value = true;

      } 
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
      waitingMessageVisible.value = true;
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
      endChat,
      endChatText,
      waitingMessageVisible,
    };
  },
};
</script>

<style>
body {
  /* margin: 0; */
  padding: 0;
}

.end-chat-button {
  background-color: #7199a0;
  color: white;
  border: none;
  padding: 5px 15px;
  margin: 6px 12px 16px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.end-chat-button:hover {
  background-color: #a87170;
}

.waiting-message,
.chat-window {
  flex: 1;
  overflow-y: auto;
  /* margin-bottom: 1rem; */
}

.spacer {
  flex-grow: 1;
}

.message-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
}

.client-message {
  background-image: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
  align-self: flex-start;
  background-color: #4f4f4f;
  margin: 10px 20% 10px 10%;
  padding: 16px;
  border-radius: 20px 20px 20px 0;
  position: relative;
  display: inline-block;
  text-align: left;
  max-width: 70%;
  word-wrap: break-word;
}

.server-message {
  background-image: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  align-self: flex-end;
  background-color: #2196f3;
  color: #fff;
  margin: 10px 10% 10px 20%;
  padding: 16px;
  border-radius: 20px 20px 0 20px;
  display: inline-block;
  text-align: left;
  max-width: 70%;
  word-wrap: break-word;
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

.container {
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* .omegle-chat {
  margin-top: auto;
} */

.omegle-chat {
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.input-group {
  margin-top: auto;
  display: flex;
  width: 100%;

}

.input-wrapper {
  position: relative;
  display: inline-block;
  width: 90%;
  margin-bottom: 10px;
  margin-right: 20px;
}

.input-group input[type="text"] {
  padding-right: 40px;
}

.fas.fa-paper-plane {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #898989;
}

li {
  /* styles all li elements*/
  list-style-type: none;
}

ul {
  padding: 0;
}

input[type="text"] {
  width: 100%;
  padding: 12px 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
}
</style>
