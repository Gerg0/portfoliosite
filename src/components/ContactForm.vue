<template>
    <div class="container">
        <form id="contactForm" @submit.prevent="sendEmail">
            <div class="message-container">
                <!-- v-if="form.user_message.length"  -->
                <span class="success" >{{ form.user_message }}</span>
                <span v-if="form.error_message.length" class="error">{{ form.error_message }}</span>
            </div>
        <div>
            <label for="from_name">Név:</label>
            <input name="from_name" type="text" v-model="form.from_name" required />
</div>
<div>
            <label for="from_email">E-mail:</label>
            <input name="from_email" type="email" v-model="form.from_email" required />
</div>
<div>
            <label for="message">Üzenet:</label>
            <textarea name="message" v-model="form.message" required></textarea>
</div>

            <input type="submit" value="Send" />
        </form>
    </div>
</template>
<script>
import emailjs from '@emailjs/browser';
import { ref } from 'vue';
import config from '../assets/config.json';
export default {
    name: "ContactForm",
    setup() {

        const form = ref({
            error_message: "",
            user_message: "siker",
            from_name: "",
            from_email: "",
            message: ""
        })

        const reset = () => {
            form.value.from_name = "",
                form.value.from_email = "",
                form.value.message = ""
        }



        const sendEmail = (e) => {

            emailjs.sendForm(config.service_id, config.template_name, e.target, config.public_key, {
                from_name: form.value.from_name,
                from_email: form.value.from_email,
                message: form.value.message
            })
                .then((result) => {
                    console.log('SUCCESS!', result.text);
                    reset();
                    form.value.user_message = "Üzenet sikeresen elküldve!"
                }, (error) => {
                    console.log('FAILED...', error.text);
                    form.value.error_message = "Valami hiba történt!"

                });
        }

        return {
            form,
            reset,
            sendEmail,
            
        };

    }
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
    resize: vertical
}

input[type=submit] {
    background-color: #04AA6D;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #45a049;
}

.container {
    border-radius: 5px;
    padding: 20px;
    max-width: 50%;
    display: flex;
    flex-direction: column;
}
.message-container{
    margin:5px;
}
.error{
    background-color: red;
    padding:20px;
}
.success{
    background-color: white;
    color: #04AA6D;
    padding:20px;
    margin: 20px;
    border-radius: 4px;
    border:5px solid #04AA6D;
}
</style>