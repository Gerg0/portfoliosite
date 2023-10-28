<template>
  <div id="sidebar" class="sidebar-container" style="">
    <div   class="item-wrapper">
      <a class="sidebar-item about" @click.prevent="scrollTo('about')">Rólam</a>
      <a class="sidebar-item experience" @click.prevent="scrollTo('experience')">Tapasztalatok</a>
      <a class="sidebar-item projects" @click.prevent="scrollTo('projects')">Projektek</a>
      <a class="sidebar-item contact" @click.prevent="scrollTo('contact')">Elérhetőségek</a>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';



const emit = defineEmits(['scrollToElement'])

const scrollTo = (elementName) => {

      emit('scrollToElement',elementName);
    }

</script>


<style>
.sidebar-container{
  height: 100%;
  width:0;
  transition: 1s; 
}

.item-wrapper{
  display:flex;
  flex-direction: column;
  background-color: #111;
  opacity: 0.8;
  height:100%;
  overflow-x: hidden;
  padding-top: 60px; 

}

.sidebar-item{
  text-align:left;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
  cursor:pointer;
}

.sidebar-item:hover {
  color: #f1f1f1;
}

.items{
  grid-area: items;
  background-color: none;
}
.about{
  grid-area: about;
}
.experience{
  grid-area: experience;
}
.projects{
  grid-area: projects;
}
.contact{
  grid-area: contact;
}

@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
  .sidebar a {font-size: 18px;}
}
</style>
