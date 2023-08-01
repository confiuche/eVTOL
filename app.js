import express from "express"
import dotenv from "dotenv"
import userRoute from "./route/userRoute.js";
import bookingRoute from "./route/bookingRoute.js";
import locationRoute from "./route/locationRoute.js"
import globalErrorHandler from "./middlewears/globalErrorHandler.js";
import { database } from "./config/dBconnect.js";
import dispatchRoute from "./route/dispatchRoute.js";
import request from "request";
import _ from "lodash";
import User from "./model/userModel.js";
import bodyParser from "body-parser";



dotenv.config();
database()
const app = express();

app.use(express.json());
app.use(globalErrorHandler)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const PORT = process.env.PORT || 8080

app.use("/api/v1/evtol/users", userRoute)
app.use("/api/v1/evtol", bookingRoute)
app.use("/api/v1/evtol/location", locationRoute)
app.use("/api/v1/evtol/dispatch",dispatchRoute)


    app.get("/success", async (req, res) => {
        res.send("<h1>Thanks your payment has been received</h1>")
      });

app.listen(PORT, console.log(`App Started at ${PORT}`))