import * as dotenv from 'dotenv';
dotenv.config()
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: flase }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true}));

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = require("stripe")(`${STRIPE_SECRET_KEY}`)

app.post("/checkout", async (req, res, next) => {
    try{
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item) => ({
                currency: "EUR",
                Product_data: {
                    name: item.name,
                    images: [item.product]
                },
                unit_amount: item.price * 100
            })),
            mode: "payment",
            succes_url: "http://localhost:4242/success.html",
            cancel_url: "http://localhost:4242/cancel.html",
        });

        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});