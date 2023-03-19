<template>
  <div id="app">
    <OmegleHome v-if="!state.showChat" @start-chat="state.showChat = true" />
    <OmegleChat v-if="state.showChat" />
  </div>
</template>

<script>
import { reactive } from "vue";
import OmegleHome from "./components/OmegleHome.vue";
import OmegleChat from "./components/OmegleChat.vue";

export default {
  components: {
    OmegleHome,
    OmegleChat,
  },

  setup() {
    const state = reactive({
      showChat: false,
    });

    return {
      state,
    };
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
