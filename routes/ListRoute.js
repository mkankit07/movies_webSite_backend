const express=require('express');
const router= express.Router()
const AuthGuard=require("../middleware/AuthGuard")
const listController= require("../controller/listController")

router.post("/",AuthGuard,listController.createNewList)
router.put("/:id",AuthGuard,listController.updateList)
router.delete("/:id",AuthGuard,listController.deleteList)
// router.get("/:id",listController.getList)
router.get("/",listController.getAllList)
// router.get("/random/list",listController.getRamdomList)

module.exports = router
