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

  CREATOR_ID: Joi.number().required(),
  CLIENT_ID: Joi.number().required(),
  MODERATOR_ID: Joi.number().required(),
  CHANNEL_ID: Joi.number().required(),
  CHANNEL_URL: Joi.string().required(),
  CHANNEL_NAME: Joi.string().required(),
  BOT_URL: Joi.string().required(),
  BOT_NAME: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = Object.freeze({
  client: { id: envVars.CLIENT_ID },
  creator: { id: envVars.CREATOR_ID },
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
  moderator: {
    id: envVars.MODERATOR_ID,
    username: envVars.MODERATOR_USERNAME,
  },
  channel: {
    id: envVars.CHANNEL_ID,
    url: envVars.CHANNEL_URL,
    name: envVars.CHANNEL_NAME,
  },
  bot: {
    url: envVars.BOT_URL,
    name: envVars.BOT_NAME,
  },
});
