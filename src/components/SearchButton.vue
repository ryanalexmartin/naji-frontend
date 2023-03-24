<template>
    <div class="horizontal-flexbox" v-show="searchButtonVisible">
      <button class="search-button" @click="searchForAnotherChat">Search for another chat</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      searchButtonVisible: {
        type: Boolean,
        required: true,
      },
    },
  
    methods: {
      searchForAnotherChat() {
        this.$emit("search-for-another-chat");
      },
    },
  };
  </script>
  
  <style scoped>
  .search-button {
    background-color: #077da8;
    border: none;
    border-radius: 3px;
    color: #ffffff;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s;
    margin: 30px;
    width: 100%;
  }
  
  .search-button:hover {
    background-color: #016f97;
    /* Slightly darker color for hover effect */
  }

  </style>
  
  