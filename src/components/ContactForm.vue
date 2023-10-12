<template>
    <div class="message-container">
        <Transition>
            <PopupMessage v-if="popupTrigger" @togglePopup="() => togglePopup()">
                {{ form.user_message }}
            </PopupMessage>
        </Transition>
    </div>
    <div class="contact-form-container">
        <div class="contact-info">
            <p>Ha oldalam felkeltette érdeklődését kérem küldjön e-mailt a tothgergo602@gmail.com címemre vagy használja
                az emailküldöt!</p>
            <p>
                <a href="Tóth_Gergő_CV_ENG.pdf" download>
                    Letölthető önéletrajzom.
                </a>
            </p>
            <p>
                <a href="https://www.linkedin.com/in/gergő-tóth-161260aa823ds" target="_blank">
                    Linkedin profilom.
                </a>
            </p>
        </div>
        <div class="contact-form">
            <form id="contactForm" @submit.prevent="sendEmail">

                <div>
                    <label for="from_name">Küldő neve:</label>
                    <input name="from_name" type="text" v-model="form.from_name" required />
                </div>
                <div>
                    <label for="from_email">Küldő e-mail címe:</label>
                    <input name="from_email" type="email" v-model="form.from_email" required />
                </div>
                <div>
                    <label for="message">Üzenet:</label>
                    <textarea name="message" v-model="form.message" required></textarea>
                </div>

                <input type="submit" value="Üzenet küldése" />
            </form>
        </div>

    </div>
</template>
<script setup>

import axios from 'axios'
import { ref } from 'vue';
import PopupMessage from '@/components/PopupMessage.vue'
import CardItem from "@/components/CardItem.vue";
const popupTrigger = ref(false)

const togglePopup = () => {
    popupTrigger.value = !popupTrigger.value;
}

const form = ref({
    error_message: "",
    user_message: "",
    from_name: "",
    from_email: "",
    message: ""
})

const reset = () => {
    form.value.from_name = "",
        form.value.from_email = "",
        form.value.message = ""
}
const sendEmail = () => {
    
    form.value.user_message = "";
    axios(`${import.meta.env.VITE_BACKEND_API_URL}/api/sendemail?fromname=${form.value.from_name}&fromemail=${form.value.from_email}&message=${form.value.message}`).then((result) => {
            reset();
            form.value.user_message = "Üzenet sikeresen elküldve!";
            togglePopup();

        }, (error) => {
            form.value.user_message = "Valami hiba történt!";
            togglePopup();
        });
}


</script>

<style scoped>
input,
select,
textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
    font-size: 20px;
}

textarea {
    height: 250px;

}

input[type=submit] {
    background-color: orange;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: fit-content;
    font-size: 20px;

}

input[type=submit]:hover {
    background-color: orange;
}

.contact-form-container {
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex: 1 1 0px;
    flex-direction: row;
    justify-content: space-between;
    /* margin: auto; */
}

.message-container {
    /* margin: 5px; */
}

.error {
    background-color: red;
    padding: 20px;
}

.success {
    background-color: white;
    color: #04AA6D;
    padding: 20px;
    margin: 20px;
    border-radius: 4px;
    border: 5px solid #04AA6D;
}



.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.contact-form {
    width: 50%;
}

.contact-info {
    text-align: start;
    width: 50%;
}
.contact-info a{
    color: white;
}
.contact-info p{
    margin-top: 50px;
}
@media only screen and (max-width: 540px) {
    .contact-form-container {
        width: 100%;
        flex-direction: column;
        font-size: 14px;
        padding:10px;
    }

    .contact-form {
        width: 100%;
        
    }

    .contact-info {
        margin-top: 5rem;
        margin-bottom: 5rem;
        text-align: center;
        width: 100%;
    }

    input[type=submit] {
        width: fit-content;
        /* font-size: 50px; */

    }
}</style>