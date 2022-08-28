const express=require('express');
const router= express.Router()
const authRoute=require("./authRoute")
const userRoute=require("./userRoute")
const movieRoute=require("./moviesRoute")
const listRoute=require("./ListRoute")
router.use("/movie",movieRoute)
router.use("/",authRoute)
router.use("/",listRoute)
router.use("/users",userRoute)

module.exports = router