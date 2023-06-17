import express from 'express'
import { isLogin } from '../middlewears/isLogin.js'
import { searchForEvtolAndPrice } from '../controller/evtolController.js'

const evtolRoute = express.Router()

evtolRoute.post("/search-for-eVTOL-model-and-price",isLogin,searchForEvtolAndPrice)

export default evtolRoute