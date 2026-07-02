
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const { getDashboard } = require("../controllers/dashboard.controller");


router.get("/", authMiddleware,authorize("admin"), getDashboard);

module.exports=router