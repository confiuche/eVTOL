import express from 'express';
import request from "request";

//const request = require('request')
import User from "../model/userModel.js";
//const User = require('../model/userModel')
import _ from "lodash"
//const _ = require('lodash')
import paystack from "../utils/payment.js";
//import paystack from '../utils/payment.js';
//import initializePayment from "../utils/payment.js"
//import verifyPayment from "../utils/payment.js"
//const {initializePayment, verifyPayment} = require('./utils/payment.js')(request);
//const {initializePayment, verifyPayment} from '../utils/payment.js'
//import {initializePayment, verifyPayment} from '../utils/payment.js'
const {initializePayment, verifyPayment} = paystack(request)


class PaymentService{
    startPayment(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const form = _.pick(data, ['amount', 'email', 'firstname']);
                form.metadata = {
                    firstname : form.firstname
                }
                form.amount *= 100;

                initializePayment(form, (error, body) => {
                    if(error){
                       reject(error.message)
                    }
                    const response = JSON.parse(body);

                    return resolve(response);
                });

            } catch (error) {
                error.source = 'Start Payment Service';
                return reject(error);
            }
        })
    }

    createPayment(req){
        const ref = req.reference;
        if(ref==null){
            return reject({ code : 400, msg: 'No reference passed in query!' });
        }
        return new Promise(async (resolve, reject)=> {
            try {

                verifyPayment(ref, (error, body) =>{
                    if(error){
                        reject(error.message)
                    }
                    const response = JSON.parse(body);

                    const{ reference, amount, status} = response.data;
                    const{email} = response.data.customer;
                    const firstname = response.data.metadata.firstname;
                    const newPayment = {reference, amount, email, firstname, status}
                    const payment = User.create(newPayment);

                    return resolve(payment)
                })
            } catch (error) {
                error.source = 'Create Payment Service';
                return reject(error)
            }

        });
    }

    paymentReciept(body){
        return new Promise(async (resolve, reject) => {
            try {
                const reference = body.reference;
                const transaction = User.findOne({reference: reference})
                return resolve(transaction);
            } catch (error) {
                error.source = 'Payment Reciept';
                return reject(error)
            }
        })
    }
}

export default PaymentService
//module.exports = PaymentService