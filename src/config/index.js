require('dotenv').config();
const Joi = require('@hapi/joi');

const envVarsSchema = Joi.object({
  TELEGRAM_TOKEN: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = Object.freeze({
  telegram: {
    token: envVars.TELEGRAM_TOKEN,
  },
});
