<template>
  <div class="home">
    <div class="tagline">
      <div></div>
      <h1>Naji</h1>
      <div>Making strangers into friends</div>
    </div>
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

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.tagline {
  display: flex;
  flex-direction: row;
align-items: center;
justify-content: space-between;
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
  