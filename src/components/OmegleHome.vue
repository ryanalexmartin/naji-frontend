<template>
  <div class="home">
    <h1>Welcome to Omegle Clone</h1>
    <button @click="startChat">Start Chat</button>
  </div>
</template>

<script>

export default {
  emits: ["start-chat"],

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

/* body {
  margin: 0;
  padding: 0;
} */

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
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
  font-size: 2.5rem;
  margin-bottom: 30px;
}
</style>
  