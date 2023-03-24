<!-- Child component -->
<template>
  <div class="input-wrapper">
      <input
          type="text"
          :value="inputMessage"
          @input="updateInputMessage"
          @keyup.enter="sendMessage(inputMessage)"
          placeholder="Type a message..."
      />
      <i class="fas fa-paper-plane" @click="sendMessage(inputMessage)"></i>
  </div>
</template>

<script>
export default {
    props: ['inputMessage'],
    methods: {
        updateInputMessage(event) {
            this.$emit('update:inputMessage', event.target.value);
        },
        sendMessage(text) {
            this.$emit('send-message', text);
        },
    },
};
</script>

<style scoped>

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