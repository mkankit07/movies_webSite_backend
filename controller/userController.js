const userModel = require("../model/userModels");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const userModels = require("../model/userModels");

/**
 * author - Ankit Maurya
 * Date - 24/08/2022
 * Description - update user profile
 */

const updateUser = async (req, res) => {
  const id = req.params.id;
  const Schema = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    profilePic: Joi.string().optional().allow(null, ""),
    isAdmin: Joi.boolean().optional(),
  });
  let validSchema = Schema.validate(req.body);
  if (validSchema.error) {
    return res.status(400).send({
      message: validSchema.error.message || "Bad request",
      code: 400,
    });
  } else {
    validSchema = validSchema.value;
  }
  try {
    console.log(req.tokenData);
    if (req.tokenData._id != req.params.id || req.tokenData.isAdmin) {
      return res.status(404).send({
        message: "Only account holder can be updated",
        code: 404,
      });
    }
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).send({
    //     message: "User id does not exist",
    //     code: 404,
    //   });
    // }
    else {
      const user = await userModel.updateOne(
        { _id: id },
        { $set: validSchema }
      );
      console.log(user);
      if (!user.matchedCount) {
        return res.status(404).send({
          message: "User id does not exist",
          code: 404,
        });
      } else {
        return res.status(200).send({
          message: "User updated",
          code: 200,
        });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Internal Server Error", code: 500 });
  }
};

/**
 * author - Ankit Maurya
 * Date - 24/08/2022
 * Description - delete user profile
 */

const deleteUser = async (req, res) => {
  try {
    console.log(req.tokenData);
    if (req.tokenData._id != req.params.id || req.tokenData.isAdmin) {
      return res.status(404).send({
        message: "Only account holder can be updated",
        code: 404,
      });
    }
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   return res.status(404).send({
    //     message: "User id does not exist",
    //     code: 404,
    //   });
    // }
    const user = await userModel.deleteOne({ _id: req.params.id });
    console.log(user);
    if (!user.deletedCount) {
      return res.status(404).send({
        message: "User id does not exists",
        code: 404,
      });
    } else {
      return res.status(200).send({
        message: "User deleted",
        code: 200,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Internal Server Error", code: 500 });
  }
};

/**
 * author - Ankit Maurya
 * Date - 24/08/2022
 * Description - Get user profile By Id
 */

const getUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({
        message: "User id does not exist",
        code: 404,
      });
    }
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({
        message: "User id does not exists",
        code: 404,
      });
    } else {
      return res.status(200).send({
        message: "User found",
        code: 200,
        data: user,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Internal Server Error", code: 500 });
  }
};

/**
 * author - Ankit Maurya
 * Date - 24/08/2022
 * Description - Get All user profile
 */

const getAll = async (req, res) => {
  try {
    const user = await userModel.find();
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        code: 404,
      });
    } else {
      return res.status(200).send({
        message: "User found",
        code: 200,
        data: user,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Internal Server Error", code: 500 });
  }
};

/**
 * author - Ankit Maurya
 * Date - 24/08/2022
 * Description - Get State
 */

const getState = async (req, res) => {
  const today = new Date();
  const lastyear = today.setFullYear(today.getFullYear() - 1);
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  try {
    const data = await userModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        }
      },
      {
        $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
      }
    ]);
    res.status(200).send({
      message: "Get State",
      data: data,
      code: 200,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "Internal Server Error", code: 500 });
  }
};

module.exports = { getAll, deleteUser, updateUser, getUser, getState };
