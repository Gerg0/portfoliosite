<template>
<div class="grid-card">

    <div class="item two">
    </div>
    <div class="item text">
        <div v-if="Model.title" class="title">
            <h3>{{Model.title}}</h3>
        </div>
        <div v-if="Model.description">
            {{Model.description}}
            <div v-if="Model.link" class="link">
                <a :href="Model.link" target="_blank">Link az oldalhoz.</a>
            </div>
        </div>
        <div v-if="Model.isTimeline">
            <TimeLine :timeLineData="Model.TimelineData"/>
        </div>
    </div>
    <div class="item one rounded-circle"><img :src="getImgUrl(Model.icon)"/></div>
</div>

</template>

<script setup>
import TimeLine from "@/components/TimeLine.vue"
const props = defineProps({
    Model:{}
})

const getImgUrl = (icon) => {
    return './'+icon;
  }

</script>

<style>


.grid-card{
    display:grid;
    grid-template-columns: auto minmax(240px, auto) auto;
    grid-template-rows: 1fr 1fr minmax(30px, auto);
    padding: 10px;
    overflow:hidden;
    max-width:600px;
    align-self: start;
}


.item{
    text-align:center;

    font-size: 20px;
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
.title{
    margin-bottom: 1rem;
}
.link{
    margin-top: 1rem;
}
</style>