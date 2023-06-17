import express from "express"
import dotenv from "dotenv"
import userRoute from "./route/userRoute.js";
import bookingRoute from "./route/bookingRoute.js";
import evtolRoute from "./route/evtolRoute.js";
import locationRoute from "./route/locationRoute.js"
import globalErrorHandler from "./middlewears/globalErrorHandler.js";
import { database } from "./config/dBconnect.js";



dotenv.config();
database()
const app = express();

app.use(express.json());
app.use(globalErrorHandler)

const PORT = process.env.PORT || 8080

app.use("/api/v1/evtol/users", userRoute)
app.use("/api/v1/evtol/booking", bookingRoute)
app.use("/api/v1/evtol/location", locationRoute)
app.use("/api/v1/evtol/search", evtolRoute)

app.listen(PORT, console.log(`App Started at ${PORT}`))