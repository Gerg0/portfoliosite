<template>
    <div id="site-layout" class="site-grid-layout">
        <div  class="sidebar">
            <SideBar @scrollToElement="scrollToElement" />
            <div style="" class="open-close-btn">
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


        <div class="intro-area grid-item full-screen">
            <div class="intro-page-container">
                <h1 class="name">Tóth Gergő</h1>
            </div>
        </div>
        <div class="content-area">
            <div class="container">
                <div class="content-grid-layout">
                    <div v-for="introduction in introductions" id="about" class="about-me-area grid-item full-screen display-grid">
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
                    <div  id="projects" class="projects-area grid-item full-screen display-grid">

                        <CardItem v-for="project in projects" :Model="project" />
                        

                    </div>
                </div>

            </div>

        </div>
        <div id="contact" class="footer-area grid-item">
            <!-- <div id="contact" class="footer-area grid-item"> -->
            <ContactForm/>
            <!-- </div> -->
        </div>

    </div>

</template>



<script setup>
import SideBar from "@/components/Layout/SideBar.vue";
import CardItem from "@/components/CardItem.vue";
import ContactForm from "@/components/ContactForm.vue";
import { onMounted, ref } from 'vue';
import axios from 'axios'

// import supabase from "../data/supabaseClient"



const introductions = ref();
const experiences = ref();
const educations = ref();
const projects = ref();

const isOpen = ref(false)

onMounted(()=>{
    isOpen.value = false
    fetchCardData();
})

const fetchCardData = async () =>{
    axios(`${import.meta.env.VITE_BACKEND_API_URL}/getsitedata`).then((result) => {
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

// const Introduction = {
//                 // description: Cards.value.description,
//                 //description: "Frontend fejlesztő ként dolgozom 2020 március óta. Főként C#-ban fejlesztek .NET Core keretrendszerben Javascript-el és MSSQL adatbázissal kiegészítve. Főként weboldalak fejlesztésével foglalkozom de munkám során részt vettem asztali alkalmazások és szolgáltatások fejlesztésében is. Szabadidőmben jelenleg Vue.js-el foglalkozom.",
//                 // text: "Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! ",
//                 description: Cards.value[0].description,
//                 icon: "Profil-modified.png",
//                 // icon: "logo.png",
//                 isTimeline: false,
//                 timelineData: [],
//             }
// const Experience = {
//                 title: "Munkatapasztalataim",
//                 icon: "workplace.jpg",
//                 isTimeline: true,
//                 timelineData: [
//                     { date: "2020-", text: "Srs Informatika Kft. Frontend Webfejlesztő" },
//                     { date: "2017-2020", text: "Rába Futómű Karbantartó mérnök" }
//                 ],
//             }
// const Education = {
//                 title: "Tanulmányaim",
//                 icon: "education.jpg",
//                 isTimeline: true,
//                 timelineData: [
//                     { date: "2018-2020", text: "Jedlik Ányos Gépipari és Informatikai Technikum" },
//                     { date: "2013-2017", text: "Széchenyi István Egyetem Gépészmérnök szakirány" }
//                 ],
//             }
// const ONTE = {
//                 title: "Ópusztaszeri Nemzeti Történeti Emlékpark",
//                 description: "Első feladatomként kaptam az ÓNTE webshop és admin tesztelését és a felmerülő hibák javítását, ez gyakran adatbázis táblák kiegészítésével és tárolteljárások átírásával járt. Maga a weboldal egy .NET feamework projekt MVC architektúrával. Átadás után ezt a weboldalt használtuk a legtöbb ügyfélnél és minden kinézettel kapcsolatos változtatás az én feladatom volt.",
//                 link: "https://opusztaszer.jegy.eu/",
//                 icon: "onte-1024x1024.jpg",
//                 isTimeline: false,
//                 timelineData: [],
//             }
// const Bahart = {
//                 title: "Balatoni Hajózási Zrt.",
//                 description: "Ez volt az első komolyabb projekt aminek egyedül csináltam meg a weboldalát. A projekt .NET core 3.1-keretrendszerben készült szintén MVC architektúrával.",
//                 link: "https://jegy.bahart.hu/",
//                 icon: "bahart.jpg",
//                 isTimeline: false,
//                 timelineData: [],
//             }
// const Hortobagy = {
//                 title: "Hortobágyi Nemzeti Park",
//                 description: "A legújabb nagy projekt amiben résztveszek itt az admin és a webshop elkészítése az én feladatom. Blazor és Tailwind css- keretrendszerekkel készült .NET core 6-tal ",
//                 link: "https://jegy.hortobagyinfo.hu/",
//                 icon: "hortobagy_logo.png",
//                 isTimeline: false,
//                 timelineData: [],
//             }

</script>



<style>


.site-grid-layout {
    display: grid;
    grid-template-areas:
        /* 'header header header header header header' */
        'intro intro intro intro intro intro'
        'content content content content content content'
        'footer footer footer footer footer footer';
    grid-auto-columns: minmax(100px, auto);
    gap: 0px;

    /* background-color: #2196F3; */
    padding: 0;
}

.site-grid-layout .grid-item {
    /* background-color: rgba(255, 255, 255, 0.8); */
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
    /* min-height: -webkit-fill-available; */
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
    /* background-color: navy; */
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
    /* transition: 1s; */
}
/* The button used to open the sidebar */
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
  /* float:right; */
  /* grid-area: open-close-btn; */
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
  /* background-color: #4CAF50; Green */
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