const userModel = require("../model/userModels");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * author - Ankit Maurya
 * Date - 24/08/2022
 * Description - create a new user Api
 */

const addNewUser = async (req, res) => {
  const Schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profilePic: Joi.string().optional().allow(null,""),
    isAdmin: Joi.boolean().optional()
  });
  let validSchema = Schema.validate(req.body);
  if (validSchema.error) {
    return res.status(400).send({
      message: validSchema.error.message|| "Bad request" ,
      code: 400,
    });
  } else {
    validSchema = validSchema.value;
  }
  try {
    const userResponse = await userModel.findOne({ email: validSchema.email });
    if (userResponse) {
      return res.status(409).send({
        message: "User already exists",
        code: 409,
      });
    } else {
      validSchema["password"] = bcrypt.hashSync(validSchema.password, 10);
      const result = await userModel.create(validSchema);
      return res.status(201).send({ messagge: "user created",
      data: result,
       code: 201 });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error" || err.message, code: 500 });
  }
};

/**
 * author - Ankit Maurya
 * Date - 24/08/2022
 * Description - user login api
 */

const login = async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  let validSchema = Schema.validate(req.body);
  if (validSchema.error) {
    return res.status(400).send({
      message: "Bad request" || validSchema.error.message,
      code: 400,
    });
  } else {
    validSchema = validSchema.value;
  }
  try {
    const userResponse = await userModel.findOne({ email: validSchema.email });
    if (!userResponse) {
      return res.status(404).send({
        message: "Email or password Invalid",
        code: 404,
      });
    } else {
      const ispassword = bcrypt.compareSync(req.body.password,userResponse.password);
      const token = jwt.sign({...userResponse._doc},"secretKey@123",{expiresIn:"5d"});
      const {password, ...info} =userResponse._doc
      if (ispassword) {
        return res.status(201).send({
          message: "user login successfully", 
          token: token,
          data: info,
          code: 200,
        });
      } else {
        return res.status(404).send({
          message: "Email or password Invalid",
          code: 404,
        });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error" || err.message, code: 500 });
  }
};

module.exports ={addNewUser, login}