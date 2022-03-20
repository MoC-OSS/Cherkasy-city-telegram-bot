require('dotenv').config();
const Joi = require('@hapi/joi');

const envVarsSchema = Joi.object({
  TELEGRAM_TOKEN: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.string().required(),

  DEBUG: Joi.boolean().required().default(false),
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
  db: {
    host: envVars.DB_HOST,
    database: envVars.DB_DATABASE,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    port: envVars.DB_PORT,
  },
  debug: envVars.DEBUG,
});
