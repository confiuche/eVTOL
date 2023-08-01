import express from "express"
import request from "request";
import dotenv from "dotenv";


dotenv.config()


const paystack = (request) => {
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

export default paystack