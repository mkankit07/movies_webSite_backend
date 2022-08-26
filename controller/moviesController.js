const movieModel = require("../model/MoviesModel");

const createNewMovie = async (req, res) => {
  try {
    if (req.tokenData.isAdmin) {
      const movieData = await movieModel.create(req.body);
      return res.status(200).json({
        message: "Movie created",
        code: 201,
      });
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      code: 500,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    if (req.tokenData.isAdmin) {
      const movieData = await movieModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({
        message: "Movie updated successfully",
      });
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      code: 500,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    if (req.tokenData.isAdmin) {
      const movieData = await movieModel.findByIdAndDelete({
        _id: req.params.id,
      });
      return res.status(200).json({
        message: "Movie deleted successfully",
        code: 200,
      });
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      code: 500,
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const movieData = await movieModel.findById({ _id: req.params.id });
    return res.status(200).json({
      message: "Movie found",
      data: movieData,
      code: 200,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      code: 500,
    });
  }
};

const getRamdomMovie = async (req, res) => {
  const type = req.params.type;
  let movie;
  try {
    if (type == "series") {
      movie = await movieModel.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await movieModel.aggregate([
        { $match: { isMovie: false } },
        { $sample: { size: 1 } },
      ]);
    }
    return res.status(200).json({
      message: "Ramdom movie found",
      data: movie,
      code: 200,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      code: 500,
    });
  }
};

module.exports ={createNewMovie,updateMovie,deleteMovie,getMovie,getRamdomMovie}