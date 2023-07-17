import express from "express"
import request from "request";

import dotenv from "dotenv";
dotenv.config()


//import { response } from "express";

const paystack = (request) => {
    //const MySecretKey = "Bearer sk_test_7b61c950faa6221c400d7d2135203bf51a9751d6"
    //const MySecretKey = "sk_test_7b61c950faa6221c400d7d2135203bf51a9751d6"
    const MySecretKey = process.env.PAYSTACK_SECRET_KEY
    //console.log(MySecretKey);

    const initializePayment = (form, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control' : 'no-cache'
            },
            form
        }
        //console.log(options);

        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request.post(options, callback)
    }

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url : 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
            headers: {
                authorization: MySecretKey,
                'content-type' : 'application/json',
                'cache-control' : 'no-cache'
            }
        }
        const callback = (error, response, body) =>{
            return mycallback(error, body)
        }
        request(options, callback);
    }

    return {initializePayment, verifyPayment};
}

//const {initializePayment, verifyPayment} = paystack
//export default {initializePayment,verifyPayment}
export default paystack
//module.exports = paystack