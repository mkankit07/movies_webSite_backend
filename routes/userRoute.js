const express=require('express');
const router= express.Router()
const userController= require("../controller/userController")
const AuthGuard=require("../middleware/AuthGuard")

router.put("/:id",AuthGuard,userController.updateUser)
router.delete("/:id",AuthGuard,userController.deleteUser)
router.get("/:id",AuthGuard,userController.getUser)
router.get("/",AuthGuard,userController.getAll)
router.get("/state/data",userController.getState)

module.exports = router