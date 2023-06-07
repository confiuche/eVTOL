import express from "express"
import dotenv from "dotenv"
import userRoute from "./route/userRoute.js";
import globalErrorHandler from "./middlewears/globalErrorHandler.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(globalErrorHandler)

const PORT = process.env.PORT || 8080

app.use("/api/v1/users", userRoute)

app.listen(PORT, console.log(`App Started at ${PORT}`))