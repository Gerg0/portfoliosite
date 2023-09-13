<template>
    <div class="popup">
        <div class="popup-inner">
            <div>
                <slot/>
            </div>
            <button class="btn btn-deffault popup-close" @click="close()">OK</button>
        </div>
    </div>
</template>

<script setup>

    const emit = defineEmits(['togglePopup'])

    const close = () => {
      emit('togglePopup');
    }
</script>

<style lang="scss" scoped>
.popup{
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    z-index: 10;
    background-color: rgba($color: #000000, $alpha: 0.4);

    display: flex;
    align-items: center;
    justify-content: center;

    
    .popup-inner{
        background: #FFF;
        padding: 33px;
        width: 300px;
        height: 200px;
        border-radius: 40px;
        color: #000000;
        border: 5px solid orange;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        }

}
</style>