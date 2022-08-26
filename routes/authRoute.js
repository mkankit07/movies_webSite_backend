const express=require('express');
const router= express.Router()
const userController= require("../controller/authController")

router.post("/auth",userController.addNewUser)
router.post("/auth/login",userController.login)

module.exports = router