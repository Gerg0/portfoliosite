<template>
  <div class="">
    <MainPage/>
  </div>
</template>

<script setup>
// import ProfileCard  from "./components/ProfileCard";
import MainPage from "@/views/MainPageView.vue";

</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'LeagueSpartan-Bold';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
    color: white;
  /* margin-top: 60px; */
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

  /* background-color: navy ;
  color: navy ; */
}

.inline-block{
  display: inline-block;
}
</style>
