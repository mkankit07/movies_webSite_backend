const express=require('express');
const router= express.Router()
const authRoute=require("./authRoute")
const userRoute=require("./userRoute")
const movieRoute=require("./moviesRoute")

router.use("/movie",movieRoute)
router.use("/",authRoute)
router.use("/users",userRoute)

module.exports = router