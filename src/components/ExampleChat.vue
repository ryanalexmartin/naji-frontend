<template>
    <div id="app">
      <div class="chat-container">
        <h1 class="title">Chat App</h1>
        <div class="chat-box">
          <div v-for="(message, index) in messages" :key="index" class="message-container" :class="message.sender">
            <div class="message-content">
              {{ message.text }}
            </div>
          </div>
        </div>
        <input type="text" class="input-message" placeholder="Type your message..." />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        messages: [
          { sender: 'user', text: 'Hey there!' },
          { sender: 'response', text: 'Hello! How can I help you today?' },
          { sender: 'user', text: 'What is the weather like today?' },
          { sender: 'response', text: 'The weather is sunny with a high of 75°F.' },
          { sender: 'user', text: 'Great, thanks!' },
          { sender: 'response', text: 'You\'re welcome! Have a great day!' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
    font-family: 'Roboto', sans-serif;
  }
  
  .chat-container {
    width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .title {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .chat-box {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-bottom: 15px;
  }
  
  .message-container {
    display: flex;
    align-items: flex-end;
  }
  
  .message-content {
    border-radius: 15px;
    padding: 10px 15px;
    max-width: 70%;
    line-height: 1.4;
    animation: fadeIn 0.3s;
  }
  
  .user {
    justify-self: flex-start;
  }
  
  .user .message-content {
    background: linear-gradient(135deg, #6EE7B7 0%, #3BA7FF 100%);
    color: #ffffff;
  }
  
  .response {
    justify-self: flex-end;
  }
  
  .response .message-content {
    background: #f0f0f0;
    color: #333333;
  }
  
  .input-message {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 20px;
  padding: 0 20px;
  margin-top: 20px;
  font-size: 16px;
  outline: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  transition: box-shadow 0.3s, background-color 0.3s;
}

.input-message::placeholder {
  color: #999999;
}

.input-message:focus {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #f0f0f0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
