<template>
    <div class="timeline-container">
        <!-- <ul>
            <li v-for="(item, index) in timeLineData" :key="index"> {{item.date}} -> {{item.text}}</li>
        </ul> -->
        <ul class="bar">
            <li class="timeline-container-item" v-for="(item, index) in timeLineData" :key="index">

                <!-- <div class="timeline-container-item"> -->
                    <!-- <div class="timeline-container-item"> -->
                        <!-- <div class="dot"></div> -->
                        <div class="text-item">
                            <div class="date">{{item.date}}</div>
                            <div class="text">{{ item.text }}</div>
                        </div>
                    <!-- </div> -->
                <!-- </div> -->
            </li>
        </ul>

    </div>

</template>

<script setup>

const props = defineProps({
    timeLineData: {}

})

</script>

<style scoped>
.bar{
    list-style: none;
}
.bar>li {
    position: relative;
}

.bar>li:before {
    content: '';
    position: absolute;
    --widthDot: 1em;
    width: var(--widthDot);
    height: var(--widthDot);
    /* right: -17px; */
    left: 0;
    background-color: white;
    border: 4px solid #FF9F55;
    top: calc(50% - var(--widthDot)/2);
    border-radius: 50%;
    z-index: 1;
}

.bar>li:after {
    position: absolute;
    left: 0.07em;
    content: '';
    border-left: 0.25em solid #FF9F55;
    margin-left: 0.5em;
    height: 100%;
}
.bar>li:first-of-type:after {
    top: 50%;
}

.bar>li:last-of-type:after {
    top: -50%;
}
.timeline-container {
    position: relative;
    max-width: inherit;
    margin: 0 auto;
    border-top: 4px solid #FF9F55;

}

/* .timeline-container::after {
    content: '';
    position: absolute;
    --widthLine: 0.25em;
    width: var(--widthLine);
    background-color: #FF9F55;
    top: 0;
    bottom: 0;
    left: 0;
    margin-left: calc(1em/2);
    height: 100%;
} */

.timeline-container-item {
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    /* width: 50%; */
}

/* The circles on the timeline */
/* .timeline-container-item::before {
    content: '';
    position: absolute;
    --widthDot: 1em;
    width: var(--widthDot);
    height: var(--widthDot);
    left: 0;
    background-color: white;
    border: 4px solid #FF9F55;
    top: calc(50% - var(--widthDot)/2);
    border-radius: 50%;
    z-index: 1;
} */

.text-item {
    font-size: 1em;
    display: flex;
    align-items: center;
}

.date {
    white-space: nowrap;
    min-width: 125px;
}

.text {
    width: 100%;
    padding-left: 5px;
}
</style>