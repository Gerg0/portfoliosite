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

        <div id="intro" class="anchor-link intro-area grid-item full-screen">
            <div class="intro-page-container">
                <h1 class="name">Tóth Gergő</h1>
            </div>
        </div>
        <div class="content-area">
            <div class="container">
                <div class="content-grid-layout">
                    
                    <div v-for="introduction in introductions" ref="about" id="about" class="anchor-link about-me-area grid-item full-screen display-grid">
                        <CardItem :Model=introduction />
                    </div>
                    <div id="experience" class="anchor-link experience-area grid-item full-screen display-grid">
                        <div v-for="experience in experiences">
                            <CardItem :Model="experience" />
                        </div>
                        <div v-for="education in educations">
                            <CardItem :Model="education" />
                        </div>

                    </div>
                    <div id="projects" class="anchor-link projects-area grid-item full-screen display-grid">

                        <CardItem v-for="project in projects" :Model="project" />
                        

                    </div>
                </div>

            </div>

        </div>
        <div  id="contact" class="anchor-link footer-area grid-item">
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
    // window.addEventListener('wheel', mainPageScrolling);
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


// const mainPageScrolling = (e) => {
//     console.log("ok");
//     e.stopPropagation();
//     if (isScrolling.value) {
//         return;
//     }
//     isScrolling.value = true;

//       let scrollY = window.scrollY
//       if (scrollY > startY.value) {
//         direction.value = 'down';
//       } else {
//         direction.value = 'up';
//       }
//       startY.value = scrollY;

//     let a= document.getElementsByClassName('anchor-link');
//     let nextElementIndex;
//     for(let i = 0 ; i < a.length ; i++) {
        

//         if(a[i].id == currentScrollElementId.value)
//         {
//             if (direction.value == "down") nextElementIndex = i+1;
//             else nextElementIndex = i-1;
            
//         }
//     }

    

    
//     if(nextElementIndex >= 0 && nextElementIndex < a.length) {
//         window.scrollTo({
//             top: document.getElementById(a[nextElementIndex].id).offsetTop,
//             left: 0,
//             behavior: 'smooth',
//         });

//         currentScrollElementId.value = a[nextElementIndex].id;
//     }
//     isScrolling.value = false;
// }


</script>



<style>


.site-grid-layout {
    display: grid;
    grid-template-areas:
        'intro intro intro intro intro intro'
        'content content content content content content'
        'footer footer footer footer footer footer';
    grid-auto-columns: minmax(100px, auto);
    gap: 0px;

    padding: 0;
}

.site-grid-layout .grid-item {
    text-align: center;
    justify-content: center;
    padding: 20px 0;
    font-size: 30px;
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
}

.experience-area {
    grid-area: experience;
    display: flex;
    flex-direction: row;
}

.projects-area {
    grid-area: projects;
    display: flex;
    flex-direction: row;
}

.footer-area {
    grid-area: footer;
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
    @media only screen and (max-width: 990px) {
        .display-grid{
            grid-template-columns: auto;
        }
    }

    .intro-page-container{
    display: block;
    color:white;
    width:100%;
    height:inherit;
    padding: 30% 60% 70% 20%;
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


@media only screen and (max-width: 400px) {
    .full-screen{
        min-height: 170vh;
    }

}
</style>