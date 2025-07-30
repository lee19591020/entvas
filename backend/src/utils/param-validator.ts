import Joi from "joi";

const paraValidator = {
  register: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      fname: Joi.string().required(),
      lname: Joi.string().required(),
      email: Joi.string().required(),
      imageData: Joi.string().required(),
      ext: Joi.string().required()
    }),
  },
  login: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  location: {
    body: Joi.object({
      lat: Joi.number().strict().required().messages({
        "number.base": '"lat" must be a number',
        "any.required": '"lat" is required',
      }),
      lng: Joi.number().strict().required().messages({
        "number.base": '"lng" must be a number',
        "any.required": '"lng" is required',
      }),
      userData: Joi.object({
        name: Joi.string().required().messages({
          "string.base": '"name" must be a string',
          "any.required": '"name" is required',
        }),
      })
        .required()
        .messages({
          "object.base": '"userData" must be an object',
          "any.required": '"userData" is required',
        }),
    }),
  },
  changePass: {
    body: Joi.object({
      newPassword: Joi.string().required(),
      oldPassword: Joi.string().required(),
    }),
  },
  getAdminById: {
    params: Joi.object({
      adminId: Joi.string().required()
    })
  },
  updateAdmin: {
    body: Joi.object({
      fname: Joi.string().required(),
      lname: Joi.string().required(),
      email: Joi.string().required(),
      imageData: Joi.string().required(),
      ext: Joi.string().required()
    }),
  },  
};

export default paraValidator;
