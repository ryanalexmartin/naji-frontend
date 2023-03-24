<!-- TODO:  We need to always be checking the websocket connection to the backend server.
If the backend server isn't found, then alert the user on the frontend -->

<template>
  <div class="container">
    <div class="Naji-chat">
      <h1>Naji</h1>
      <div v-if="!connected && !searchButtonVisible && waitingMessageVisible" class="waiting-message">
        <div>
          Searching for a user to connect you with...
        </div>
        <!-- Temporary div to represent ad space -->
        <ins class="adsbygoogle" :style="adStyle" :data-ad-client="adClient" :data-ad-slot="adSlot"
          :data-ad-format="adFormat" :data-full-width-responsive="true"></ins>
      </div>
      <div v-if="showChatWindow" class="chat-window">
        <ul>
          <li v-for="(message, index) in messages" :key="index" :set="message = JSON.parse(message)">
            <div v-if="message.sender === 'system'" class="system-message">
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
          <InputBox :input-message="inputMessage" @update:inputMessage="inputMessage = $event"
            @send-message="sendMessage($event)" />
        </div>
      </div>
      <SearchButton :search-button-visible="searchButtonVisible" @search-for-another-chat="searchForAnotherChat" />
    </div>
  </div>
</template>

<script>
import alertSound from '@/assets/alert.mp3';
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { backendURL } from "../../config";
import { animateSpinningMoon, animateHeartBeat } from "./tabAnimations";
import InputBox from './InputBox.vue';

import SearchButton from "@/components/SearchButton.vue";


export default {
  name: "NajiChat",

  components: {
    SearchButton,
    InputBox
  },

  setup() {
    const messages = ref([]);
    const inputMessage = ref("");
    const websocket = ref(null);
    const connected = ref(false);
    const showChatWindow = ref(false);
    const searchButtonVisible = ref(false);
    const endChatText = ref("End Chat");
    const waitingMessageVisible = ref(true);
    const windowIsActive = ref(true);

    onMounted(() => {
      initializeWebSocket();
      window.addEventListener("focus", handleWindowFocus);
      window.addEventListener("blur", handleWindowBlur);

      // Check websocket connection every 10 seconds
      setInterval(checkWebSocketConnection, 10000);
    });

    onUnmounted(() => {
      if (websocket.value) {
        websocket.value.send(JSON.stringify({ type: "disconnect" }));
        websocket.value.close();
      }
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
    });

    function initializeWebSocket() {
      console.log("Establishing secure websocket connection...")
      websocket.value = new WebSocket(`${backendURL}/ws`);
      websocket.value.onmessage = (event) => {
        const messageData = JSON.parse(event.data);

        if (messageData.type === "status") {
          // Handle the status message
          if (messageData.text.includes("Now connected! Let's talk about")) {
            connected.value = true;
            showChatWindow.value = true;
            searchButtonVisible.value = false;
          } else if (messageData.text === "The other user has disconnected.") {
            connected.value = false;
            searchButtonVisible.value = true;
          } else if (messageData.text === "You have ended the chat.") {
            searchButtonVisible.value = true;
            console.log("DISCONNECTING")
            websocket.value.close();
            connected.value = false;
          }
          messages.value.push(JSON.stringify({ "sender": "system", "message": messageData.text }));
        } else if (connected.value) {
          messages.value.push(JSON.stringify({ "sender": "Stranger", "message": messageData.text }));
          // Inside the websocket.onmessage event handler, add the following code right after the message is added to messages.value
          if (!windowIsActive.value) {
            playAlertSoundAndAnimateTab();
          }
          scrollToBottom(); // Add this line
        }
      };
    }

    function handleWindowFocus() {
      windowIsActive.value = true;
      document.title = "Naji";
    }

    function handleWindowBlur() {
      windowIsActive.value = false;
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

    function checkWebSocketConnection() {
      if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
        connected.value = true;
      } else {
        connected.value = false;
        window.alert("Unable to connect to server. Please check your internet connection and try again.");
      }
    }

    function scrollToBottom() {
      nextTick(() => {
        const chatWindow = document.querySelector(".chat-window");
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
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
        scrollToBottom(); // Add this line
      }
    }

    function searchForAnotherChat() {
      messages.value = [];
      searchButtonVisible.value = false;
      showChatWindow.value = false;
      waitingMessageVisible.value = true;
      endChatText.value = "End Chat";
      initializeWebSocket();
    }

    // Add these two functions to play a sound and animate the tab's metadata
    function playAlertSoundAndAnimateTab() {
      if (!document.hasFocus()) {
        playAlertSound();
        const animations = [animateSpinningMoon, animateHeartBeat];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        randomAnimation();
      }
    }

    function playAlertSound() {
      const audio = new Audio(alertSound);
      audio.play();
    }
    return {
      messages,
      inputMessage,
      sendMessage,
      connected,
      searchButtonVisible,
      searchForAnotherChat,
      showChatWindow,
      scrollToBottom,
      endChat,
      endChatText,
      waitingMessageVisible,
      checkWebSocketConnection,
    };
  },
};
</script>

<style scoped>
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
  background-image: linear-gradient(135deg, #536a8f 0%, #0a5a7f 100%);
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
  background-image: linear-gradient(135deg, #4facfe 0%, #09c1cb 100%);
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
  background-color: #026b9f41;
  padding: 10px;
  /* border-radius: 5px; */
}

.container {
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.Naji-chat {
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

h1 {
  margin-bottom: 5px;
}

li {
  /* styles all li elements*/
  list-style-type: none;
}

ul {
  padding: 0;
}
</style>
