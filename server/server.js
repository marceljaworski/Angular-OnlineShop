import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from 'stripe';

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true}));

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(STRIPE_SECRET_KEY);

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

app.listen(4242, () => console.log('app is running on port 4242'));