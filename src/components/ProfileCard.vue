<template>
<div class="grid-card">
 
    <div class="item two">
        <!-- <div class="grid-content">
            <div class="item text">Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!Valami szöveg valami nagyon menő dologról!</div>
        </div> -->
    </div>
    <div class="item text">
        {{ Class.text }}
        <div v-if="Class.isTimeline">
            <TimeLine/>
        </div>
    </div>
    <div class="item one rounded-circle"><img :src="getImgUrl(Class.icon)" class=""/></div>
</div>

</template>

<script>
import TimeLine from "./TimeLine"
export default {
 name: "ProfileCard",
 components: { TimeLine },
 props:{
    Class:{}
 },
 methods:{
    getImgUrl(icon) {
    var images = require.context('../assets/', false);
    return images('./' + icon);
  }
 }
}
</script>

<style>


.grid-card{
    display:grid;
    grid-template-columns: auto minmax(240px, auto) auto;
    grid-template-rows: 1fr 1fr minmax(30px, auto);
    padding: 10px;
    overflow:hidden;
    /* border-radius: 90px; */
    max-width:100%;
    margin:auto;
}


.item{
    text-align:center;
    
    font-size: 30px;
}

.item.one {
    grid-area: 1 / 2 / 3 / 3;
    background-color:none;
    overflow: hidden;
}

.item.one img{
  width: 15rem;
  border: 5px solid orange;
  overflow:show;
    border-radius:50%;

}

.item.two {

    grid-area: 2 / 1 / 4 / 4;
    background-color:white;
    border: 5px solid orange;
    border-radius: 90px;
}

.item.text{
    grid-area: 3 / 1 / 4 / 4;
    margin:2rem;
    color:#1c1d25;

}
</style>