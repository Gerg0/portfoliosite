<template>

    <div id="site-layout" class="site-grid-layout">
        <SideBar v-on:scrollToElement="scrollToElement" />
        <div class="intro-area grid-item full-screen">
            <IntroPage />
        </div>
        <div class="content-area">
            <div class="container">
                <div class="content-grid-layout">
                    <div id="about" class="about-me-area grid-item full-screen display-grid">
                        <CardItem :Class=Introduction />
                    </div>
                    <div id="experience" class="experience-area grid-item full-screen display-grid">
                        <CardItem :Class="Experience" />
                        <CardItem :Class="Education" />
                        
                    </div>
                    <div id="projects" class="projects-area grid-item full-screen display-grid">projects</div>
                </div>

            </div>

        </div>
        <div id="contact" class="footer-area grid-item">footer</div>

    </div>

</template>




<script>
import SideBar from "./SideBar";
import IntroPage from "./IntroPage";
import CardItem from "./CardItem";

export default {
    name: 'MainPage',
    components: {
        IntroPage,
        SideBar,
        CardItem
    },
    methods: {
        scrollToElement(elementName) {
            document.getElementById(elementName).scrollIntoView({ behavior: 'smooth' });
        },

    },
    data() {
        return {
            Introduction: {
                // text: "Frontend fejlesztő ként dolgozom 2020 március óta. Főként C#-ban fejlesztek .NET Core keretrendszerben Javascript-el és MSSQL adatbázissal kiegészítve. Főként weboldalak fejlesztésével foglalkozom de munkám során részt vettem asztali alkalmazások és szolgáltatások fejlesztésében is. Szabadidőmben jelenleg Vue.js-el foglalkozom.",
                text: "Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! Valami szöveg! ",

                // icon: "Profil-modified.png",
                icon: "logo.png",
                isTimeline: false,
                timeLineData: [],
            },
            Experience: {
                text: "Itt leírom hogy milyen tapasztalatokkal rendelkezem",
                icon: "logo.png",
                isTimeline: true,
                timeLineData: [
                    { date: "2020-", text: "Srs Informatika Kft. Frontend Webfejlesztő" },
                    { date: "2017-2020", text: "Rába Futómű Karbantartó mérnök" }
                ],
            },
            Education: {
                text: "Ide azt írom hogy milyen sulikba jártam",
                icon: "logo.png",
                isTimeline: true,
                timeLineData: [
                    { date: "2018-2020", text: "Jedlik Ányos Gépipari és Informatikai Technikum és Kollégium" },
                    { date: "2013-2017", text: "Széchenyi István Egyetem" }
                ],
            },
        }
    }
}

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
    min-height: 100vh;
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
</style>