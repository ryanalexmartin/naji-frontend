<template>
    <a :href="inviteLink" target="_blank" rel="noopener noreferrer">
      <button class="discord-invite-button" :class="{ 'is-visible': isVisible }">
        <span>Help make Naji better!</span>
        <img src="../assets/discord-logo.svg" alt="Discord Logo" />
      </button>
    </a>
  </template>
  
  <script>
  export default {
    props: {
      serverId: {
        type: String,
        required: true,
      },
      inviteCode: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isVisible: false,
      };
    },
    mounted() {
      // Show the button after a delay
      setTimeout(() => {
        this.isVisible = true;
      }, 1000);
    },
    computed: {
      inviteLink() {
        return `https://discord.gg/${this.inviteCode}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .discord-invite-button {
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #7289da;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    outline: none;
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.3s ease, transform 0.5s ease;
  }
  
  .discord-invite-button.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .discord-invite-button:hover {
    background-color: #677bc4;
  }
  
  .discord-invite-button img {
    margin-left: 10px;
    height: 20px;
  }
  </style>
  