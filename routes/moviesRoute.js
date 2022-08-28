const express=require('express');
const router= express.Router()
const AuthGuard=require("../middleware/AuthGuard")
const movieController= require("../controller/moviesController")

router.post("/",AuthGuard,movieController.createNewMovie)
router.put("/:id",AuthGuard,movieController.updateMovie)
router.delete("/:id",AuthGuard,movieController.deleteMovie)
router.get("/:id",movieController.getMovie)
router.get("/",movieController.getAllMovie)
// router.get("/random/movie",movieController.getRamdomMovie)

module.exports = router
