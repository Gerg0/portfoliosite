<template>
  <div class="">
    <MainPage/>
  </div>
</template>

<script setup>
import MainPage from "@/views/MainPageView.vue";

</script>

<style>
#app {
  font-family: 'LeagueSpartan-Bold';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
    color: white;
}
html{
  width: 100%;
  height: 100%;
}

body{
  width: 100%;
  height: 100%;
  max-height: 100%;
  margin:0;
  top: 0;
  background-color: #1c1d25;
}

.inline-block{
  display: inline-block;
}
</style>
