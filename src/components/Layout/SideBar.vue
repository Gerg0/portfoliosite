<template>
  <div id="sidebar" class="sidebar-container" style="">
    
      
    <div   class="item-wrapper">
      <a class="sidebar-item about" @click.prevent="scrollTo('about')">Rólam</a>

      <a class="sidebar-item experience" @click.prevent="scrollTo('experience')">Tapasztalatok</a>
      <a class="sidebar-item projects" @click.prevent="scrollTo('projects')">Projektek</a>
      <a class="sidebar-item contact" @click.prevent="scrollTo('contact')">Elérhetőségek</a>
    </div>
    <!-- <div style="" class="open-close-btn">
      <a href="javascript:void(0)" class="triggerbtn" v-if="!isOpen" @click.prevent="openSideBar()">&#9776;</a>
      <a href="javascript:void(0)" class="triggerbtn" v-else @click.prevent="closeSideBar()">&times;</a>
    </div> -->
  </div>
</template>


<script setup>
import { ref } from 'vue';


// const isOpen = ref(false) 

const emit = defineEmits(['scrollToElement'])

// const closeSideBar = () => {
//       document.getElementById("sidebar").style.marginLeft = "-20%";
//       isOpen.value=false;
//     }
// const openSideBar = () => {
//       document.getElementById("sidebar").style.marginLeft = "auto";
//       isOpen.value=true;
//     }
const scrollTo = (elementName) => {
      // console.log(elementName);

      emit('scrollToElement',elementName);
    }

</script>


<style>
.sidebar-container{
  /* display:block; */
  height: 100%;
  width:0;
  /* position: fixed;  */
  /* z-index: 2;  */
  /* top: 0; */
  /* margin-left: -100%; */
  transition: 1s; 
}

.item-wrapper{
  display:flex;
  flex-direction: column;
  background-color: #111;
  opacity: 0.8;
  height:100%;
  overflow-x: hidden;
  /* width:0; */

  padding-top: 60px; 

}

/* .sidebar-grid-layout{
  display:grid;
  grid-template-areas:'about open-close-btn'
                      'experience items'
                      'projects items'
                      'contact items';
  grid-auto-columns: minmax(100px, auto);
  gap: 10px;
  padding: 0;
} */

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


/* The button used to open the sidebar
.triggerbtn {
  font-size: 50px;
  cursor: pointer;
  color: white;
  text-decoration: none;
} */

/* .open-close-btn{
  display:flex; 
  justify-content:center;
  align-items:center;
  margin-top: 60px;
  float:right;
  grid-area: open-close-btn;
  height: 5em;
  width: 5em;
  border-radius: 0px 10px 10px 0px;
  overflow: hidden;
  background-color: #111;
} */

/* .openbtn:hover {
  background-color: #444;
} */
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

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
  .sidebar a {font-size: 18px;}
}
</style>
