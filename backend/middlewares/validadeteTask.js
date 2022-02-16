const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().min(4).required(),
  description: Joi.string().min(8).required(),
  status: Joi.string().required()
});

const validateTask = (req, res, next) => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: validation.error.message,
      },
    });
  }
  next();
};

module.exports = {
  validateTask,
};