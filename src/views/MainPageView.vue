<template>
    <div id="site-layout"  class="site-grid-layout">
        <div  class="sidebar">
            <SideBar @scrollToElement="scrollToElement" />
            <div  class="open-close-btn">
                <a class="triggerbtn"  @click.prevent="openSideBar()">
                    <div id="nav-icon3">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </a>
            </div>
        </div>

        <div id="intro" class="intro-area grid-item full-screen">
            <div class="intro-page-container">
                <h1 class="name">Tóth Gergő</h1>
            </div>
        </div>
        <div class="content-area">
            <div class="container">
                <div class="content-grid-layout">
                    
                    <div v-for="introduction in introductions" ref="about" id="about" class="about-me-area grid-item full-screen display-grid">
                        <CardItem :Model=introduction />
                    </div>
                    <div id="experience" class="experience-area grid-item full-screen display-grid">
                        <div v-for="experience in experiences">
                            <CardItem :Model="experience" />
                        </div>
                        <div v-for="education in educations">
                            <CardItem :Model="education" />
                        </div>

                    </div>
                    <div id="projects" class="projects-area grid-item full-screen display-grid">

                        <CardItem v-for="project in projects" :Model="project" />
                        

                    </div>
                </div>

            </div>

        </div>
        <div  id="contact" class="footer-area full-screen grid-item">
            <ContactForm/>
        </div>

    </div>



</template>



<script setup>
import SideBar from "@/components/Layout/SideBar.vue";
import CardItem from "@/components/CardItem.vue";
import ContactForm from "@/components/ContactForm.vue";
import { onMounted, ref } from 'vue';
import axios from 'axios'




const introductions = ref();
const experiences = ref();
const educations = ref();
const projects = ref();

const isOpen = ref(false);
const currentScrollElementId = ref("intro");
const isScrolling = ref(false);

const direction = ref("");
const startY = ref(0);

onMounted(()=>{
    isOpen.value = false;
    fetchCardData();
    addSmoothScrolling();
})

const fetchCardData = async () =>{
    axios(`${import.meta.env.VITE_BACKEND_API_URL}/api/getsitedata`).then((result) => {
        if (result.error && result.status !== 406) throw result.error;
        
        if(result.data){
            introductions.value = result.data.filter(obj => obj.contentType == "introduction");
            experiences.value = result.data.filter(obj => obj.contentType == "experience");
            educations.value = result.data.filter(obj => obj.contentType == "education");
            projects.value = result.data.filter(obj => obj.contentType == "project");
            }
        }, (error) => {
            console.log(error);
    });
}


const closeSideBar = () => {
      document.getElementById("sidebar").style.width = "0";
      isOpen.value = false;
    };

const openSideBar = () => {
        document.getElementById("nav-icon3").classList.toggle("open");
        if (isOpen.value == false) {
            document.getElementById("sidebar").style.width = "100%";
            isOpen.value = true;
        }
        else{
            document.getElementById("sidebar").style.width = "0";
            isOpen.value = false;

        }
    };

const scrollToElement = (elementName) => {
    document.getElementById(elementName).scrollIntoView({ behavior: 'smooth' });
    
};

const addSmoothScrolling = () =>{
    const container = document.querySelector('.site-grid-layout');
    
    container.addEventListener('wheel', (event) => {
        event.preventDefault();
        const delta = event.deltaY;

        container.scrollBy({
            top: delta,
            behavior: 'smooth'
        });
    });
}

</script>



<style>

body{
      overflow: hidden;
}
.site-grid-layout {
    display: grid;
    grid-template-areas:
        'intro intro intro intro intro intro'
        'content content content content content content'
        'footer footer footer footer footer footer';
    grid-auto-columns: minmax(100px, auto);
    /* gap: 30px; */
    padding: 0;

    height: 100svh;

    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;


}

.site-grid-layout .grid-item {
    text-align: center;
    justify-content: center;
    padding: 20px 0;
    font-size:1.3rem;
}

.content-grid-layout {
    display: grid;
    grid-template-areas:
        'about about about about about about'
        'experience experience experience experience experience experience'
        'projects projects projects projects projects projects';
    gap: 10px;
}

.header-area {
    grid-area: header;
}

.intro-area {
    grid-area: intro;
    padding: 0 !important;
    font-size: 0;
    overflow: hidden;

    scroll-snap-align: start;
}

.full-screen {
    min-height: 100svh;
    width: 100%;
}

.intro-area>img {
    height: 100%;
}

.content-area {
    grid-area: content;
}

.about-me-area {
    grid-area: about;
    grid-template-columns: auto !important;

    scroll-snap-align: start;
}

.experience-area {
    grid-area: experience;
    display: flex;
    flex-direction: row;

    scroll-snap-align: start;
}

.projects-area {
    grid-area: projects;
    display: flex;
    flex-direction: row;

    scroll-snap-align: start;
}

.footer-area {
    display:flex;
    grid-area: footer;
    align-items: end;
    scroll-snap-align: start;
}

.display-grid {
    display: grid;
    grid-template-columns: auto auto auto;
    }

    .display-inline-block {
        display: inline-block;
    }

    .container {
        width: auto;
    }
   
    .intro-page-container{
    display: block;
    color:white;
    width:100%;
    height:inherit;
    padding: 30% 60% 70% 20%;
    font-size: 30px;
}

.name{
    margin:auto;
}
.sidebar{
    position: fixed;
    display: -webkit-inline-box;;
    height: 100%;
    z-index: 2;
    top: 0;
    margin-left: auto;
    width:auto;
}
.triggerbtn {
  font-size: 50px;
  cursor: pointer;
  color: white;
  text-decoration: none;
}
.open-close-btn{
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top: 60px;
  height: 5em;
  width: 5em;
  border-radius: 0px 10px 10px 0px;
  overflow: hidden;
  background-color: #111;
}

.openbtn:hover {
  background-color: #444;
}



* {
  margin: 0;
  padding: 0;
}


#nav-icon3 {
  width: 60px;
  height: 45px;
  position: relative;
  margin: 50px auto;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

#nav-icon3 span {
  display: block;
  position: absolute;
  height: 9px;
  width: 100%;
  background: white;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#nav-icon3 span:nth-child(1) {
  top: 0px;
}

#nav-icon3 span:nth-child(2),#nav-icon3 span:nth-child(3) {
  top: 18px;
}

#nav-icon3 span:nth-child(4) {
  top: 36px;
}

#nav-icon3.open span:nth-child(1) {
  top: 18px;
  width: 0%;
  left: 50%;
}

#nav-icon3.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#nav-icon3.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#nav-icon3.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}

.btn {
  background-color: orange;
    color: white;
    padding: 12px 20px;
    margin-top: 30px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: fit-content;
    min-width: 100px;
    font-size: 20px;
}


@media only screen and (max-width: 540px) {
    .intro-page-container{
        font-size:20px;
        padding: 60% 0% 70% 0%;
    }

    .site-grid-layout {
        grid-auto-columns: auto;
    }

    .footer-area {
        margin-top: 10rem;
        display: flex;
        scroll-snap-align: end;
    }
    
}

@media only screen and (max-width: 990px) {

    .site-grid-layout {
        scroll-snap-type: none;
        overflow-y: auto;
    }
    .display-grid{
        grid-template-columns: auto;
    }
}

</style>