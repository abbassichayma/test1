const express = require("express");
const heartRouter = express.Router();

const heartSchema = require("../models/heart.model");
const {addHeart,getHearts} = require('../controllers/heart.controller')

heartRouter.post("/addHeart",addHeart );
heartRouter.get("/",getHearts);

module.exports = heartRouter;
