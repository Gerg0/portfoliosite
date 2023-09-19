require('dotenv').config(); 

const supabase = require('./supabaseClient.js');
const emailjs = require('@emailjs/nodejs');

const express = require('express')
const app = express()
const port = 3000

app.get('/sendemail', (request, response) => {
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
    let templateParams = {
        from_name: request.query.fromname,
        from_email: request.query.fromemail,
        message: request.query.message
    };
    try {
    emailjs
        .send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_NAME, templateParams, {
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY,
        })
        .then(res =>{
            console.log(res.data);
            response.send(res.data);
        });
    } catch (err) {
        if (err instanceof EmailJSResponseStatus) {
          console.log('EMAILJS FAILED...', err);
          return;
        }
      
        console.log('ERROR', err);
      }
})

app.get('/getsitedata', async (request, response) => {
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
    const {data, error, status} = await supabase
        .from("SiteContent")
        .select(`*, TimelineData (*) `);
    
    response.send(data, error, status);
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})