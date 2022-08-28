const ListModel = require("../model/List");

const createNewList = async (req, res) => {
    try {
        console.log(req.tokenData);
        if (req.tokenData.isAdmin) {
            const movieData = await ListModel.create(req.body);
            return res.status(200).json({
                message: "Movie created",
                code: 201,
            });
        } else {
            return res.status(401).json({
                message: "you not allowed to create a new movie",
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            code: 500,
        });
    }
};

const updateList = async (req, res) => {
    try {
        if (req.tokenData.isAdmin) {
            const movieData = await ListModel.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            return res.status(200).json({
                message: "List updated successfully",
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

const deleteList = async (req, res) => {
    try {
        if (req.tokenData.isAdmin) {
            const ListData = await ListModel.findByIdAndDelete({
                _id: req.params.id,
            });
            return res.status(200).json({
                message: "List deleted successfully",
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

// const getList = async (req, res) => {
//   try {
//     const ListData = await ListModel.findById({ _id: req.params.id });
//     return res.status(200).json({
//       message: "List found",
//       data: ListData,
//       code: 200,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message || "Internal Server Error",
//       code: 500,
//     });
//   }
// };

// const getRamdomList = async (req, res) => {
//   const type = req.params.type;
//   let List;
//   try {
//     if (type == "series") {
//       List = await ListModel.aggregate([
//         { $match: { isSeries: true } },
//         { $sample: { size: 1 } },
//       ]);
//     } else {
//       List = await ListModel.aggregate([
//         { $match: { isSeries: false } },
//         { $sample: { size: 1 } },
//       ]);
//     }
//     return res.status(200).json({
//       message: "Ramdom List found",
//       data: List,
//       code: 200,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message || "Internal Server Error",
//       code: 500,
//     });
//   }
// };

const getAllList = async (req, res) => {
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await ListModel.aggregate([{
                    $simple: { size: 10 }
                }, {
                    $match: { type: typeQuery, genre: genreQuery }
                }])
            } else {
                list = await ListModel.aggregate([{
                    $simple: { size: 10 }
                }, {
                    $match: { type: typeQuery }
                }])
            }
        } else {
            list = await ListModel.aggregate([{
                $simple: { size: 10 }
            }])
        }
        return res.status(200).json({
            message: "List found",
            data: ListData.reverse(),
            code: 200,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            code: 500,
        });
    }
};

module.exports = { createNewList, updateList, deleteList, getAllList }