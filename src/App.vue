<template>
  <div id="app">
    <NajiHome v-if="!state.showChat" @start-chat="state.showChat = true" />
    <NajiChat v-if="state.showChat" />
    <div class="wave"></div>
     <div class="wave"></div>
     <div class="wave"></div>
  </div>
</template>

<script>
import { reactive } from "vue";
import NajiHome from "./components/NajiHome.vue";
import NajiChat from "./components/NajiChat.vue";

export default {
  components: {
    NajiHome,
    NajiChat,
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

body, #app {
  /* height: 100%; */
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eaedf1;
  /* margin-top: 60px; */
}


body {
    margin: 0;
    padding: 0;
    top: 0;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: auto;
    background: linear-gradient(315deg, rgba(101,0,94,1) 3%, rgb(12, 48, 85) 38%, rgb(12, 79, 57) 68%, rgb(4, 82, 14) 98%);
    animation: gradient 150s ease infinite;
    background-size: 400% 400%;
    background-attachment: fixed;
}

@keyframes gradient {
    0% {
        background-position: 0% 0%;
    }
    50% {
        background-position: 100% 100%;
    }
    100% {
        background-position: 0% 0%;
    }
}

.wave {
    background: rgb(255 255 255 / 25%);
    border-radius: 1000% 1000% 0 0;
    position: fixed;
    width: 200%;
    height: 12em;
    animation: wave 100s -300s linear infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    bottom: 0;
    left: 0;
    z-index: -1;
}

.wave:nth-of-type(2) {
    bottom: -1.25em;
    animation: wave 180s linear reverse infinite;
    opacity: 0.8;
}

.wave:nth-of-type(3) {
    bottom: -2.5em;
    animation: wave 200s -100s reverse infinite;
    opacity: 0.9;
}

@keyframes wave {
    2% {
        transform: translateX(1);
    }

    25% {
        transform: translateX(-25%);
    }

    50% {
        transform: translateX(-50%);
    }

    75% {
        transform: translateX(-25%);
    }

    100% {
        transform: translateX(1);
    }
}

</style>

