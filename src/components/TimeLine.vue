<template>
    <div class="timeline-container">
        <!-- <ul>
            <li v-for="(item, index) in timeLineData" :key="index"> {{item.date}} -> {{item.text}}</li>
        </ul> -->
        <div v-for="(item, index) in timeLineData" :key="index">

            <div class="timeline-container-item">
                <div class="">
                    <!-- <div class="dot"></div> -->
                    <div class="text-item">
                        <div class="date">{{item.date}}</div> <div class="text">{{ item.text }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: "TimeLine",
    props: {
        timeLineData: {}
    },
}
</script>

<style scoped>
.timeline-container {
    position: relative;
    max-width: inherit;
    margin: 0 auto;
    border-top: 4px solid #FF9F55;

}

.timeline-container::after {
    content: '';
    position: absolute;
    --widthLine: 0.25em;
    width: var(--widthLine);
    background-color: #FF9F55;
    top: 0;
    bottom: 0;
    left: 0;
    margin-left: calc(1em/2 - var(--widthLine)/2);
}

.timeline-container-item {
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    /* width: 50%; */
}

/* The circles on the timeline */
.timeline-container-item::after {
    content: '';
    position: absolute;
    --widthDot:1em;
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

.text-item{
    font-size: 0.7em;
    display: flex;
    align-items: center;
}
.date{
    white-space: nowrap;
    min-width: 125px;
}
.text{
    width:100%;
    padding-left:5px;
}
</style>