<template>
    <form ref="form" @submit.prevent="sendEmail" @reset="reset">

        <div>
            <label for="from_name">Név:</label>
            <input name="from_name" type="text" v-model="from_name" />
        </div>

        <div>
            <label for="from_email">E-mail:</label>
            <input name="from_email" type="email" v-model="from_email" />
        </div>

        <div>
            <label for="message">Üzenet:</label>
            <textarea name="message" v-model="message"></textarea>
        </div>

        <input type="submit" value="Send" />
    </form>
</template>
<script>
import emailjs from '@emailjs/browser';
import { ref } from 'vue';
import config from '../assets/config.json';
export default {
    name: "ContactForm",
    setup() {
        let from_name ="";
        let from_email = "";
        let message = "";

        const form = ref(null);

        const reset = () =>{
            from_name.value = "",
            from_email.value = "",
            message.value = ""
        }

        const sendEmail = () =>{
             emailjs.sendForm(config.service_id, config.template_name, form.value, config.public_key, {
                    from_name: from_name,
                    from_email: from_email,
                    message: message
                })
                    .then((result) => {
                        console.log('SUCCESS!', result.text);
                        reset();
                    }, (error) => {
                        console.log('FAILED...', error.text);
                    });
        }

        return {
            from_name,
            from_email,
            message,
            form,
            reset,
            sendEmail
        };
    }
}
</script>

<style>
</style>