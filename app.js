import express from "express"
import dotenv from "dotenv"
import userRoute from "./route/userRoute.js";
import globalErrorHandler from "./middlewears/globalErrorHandler.js";
import { database } from "./config/dBconnect.js";
import bookingRoute from "./route/bookingRoute.js";


dotenv.config();
const app = express();
database()

app.use(express.json());
app.use(globalErrorHandler)

const PORT = process.env.PORT || 8080

app.use("/api/v1/evtol/users", userRoute)
app.use("/api/v1/evtol/booking", bookingRoute)

app.listen(PORT, console.log(`App Started at ${PORT}`))