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