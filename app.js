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

// app.post("/paystack/pay", (req, res) => {
//     const form = _.pick(req.body, ["amount", "email", "firstname"]);
//     form.metadata = {
//         firstname: form.firstname,
//     };
//     form.amount *= 100;
  
//     initializePayment(form, (error, body) => {
//       if (error) {
//         return res.redirect("/error");
//       }
//       const response = JSON.parse(body);
//       res.redirect(response.data.authorization_url);
//     });
//   });
  
//   app.get("/paystack/callback", (req, res) => {
//     const ref = req.query.reference;
//     verifyPayment(ref, (error, body) => {
//       if (error) {
//         return res.redirect("/error");
//       }
//       const response = JSON.parse(body);
  
//       const data = _.at(response.data, [
//         "reference",
//         "amount",
//         "customer.email",
//         "metadata.fullName",
//       ]);
  
//       const [reference, amount, email, fullName] = data;
  
//       const donor = new Donor({ reference, amount, email, fullName });
  
//       donor
//         .save()
//         .then((donor) => {
//           if (!donor) {
//             return res.redirect("/error");
//           }
//           res.redirect("/receipt/" + donor._id);
//         })
//         .catch((e) => {
//           res.redirect("/error");
//         });
//     });
//   });
  
//   app.get("/receipt/:id", async (req, res) => {
//     const id = req.params.id;
  
//     Donor.findById(id)
//       .then((donor) => {
//         if (!donor) {
//           res.redirect("/error");
//         }
//         res.render("success.pug", { donor });
//       })
//       .catch((e) => {
//         res.redirect("/error");
//       });
//   });

    app.get("/success", async (req, res) => {
        res.send("<h1>Thanks your payment has been received</h1>")
      });

app.listen(PORT, console.log(`App Started at ${PORT}`))