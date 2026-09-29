import 'dotenv/config'
import * as joi from 'joi'

type EnvVariables = {
  PORT: number
  DATABASE_URL: string
  JWT_SECRET: string
  JWT_REFRESH_SECRET: string
  GEMINI_API_KEY: string
  RENIEC_TOKEN: string
  CLOUDINARY_NAME: string
  CLOUDINARY_API_KEY: string
  CLOUDINARY_API_SECRET: string
  PUSHER_APP_ID: string
  PUSHER_KEY: string
  PUSHER_SECRET: string
  PUSHER_CLUSTER: string
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    GEMINI_API_KEY: joi.string().required(),
    RENIEC_TOKEN: joi.string().required(),
    CLOUDINARY_NAME: joi.string().required(),
    CLOUDINARY_API_KEY: joi.string().required(),
    CLOUDINARY_API_SECRET: joi.string().required(),

    // ✅ Añadir validaciones para Pusher
    PUSHER_APP_ID: joi.string().required(),
    PUSHER_KEY: joi.string().required(),
    PUSHER_SECRET: joi.string().required(),
    PUSHER_CLUSTER: joi.string().required(),
  })
  .unknown(true)

const { error, value } = envSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const envVariables: EnvVariables = {
  PORT: Number(value.PORT),
  DATABASE_URL: value.DATABASE_URL,
  JWT_SECRET: value.JWT_SECRET,
  JWT_REFRESH_SECRET: value.JWT_REFRESH_SECRET,
  GEMINI_API_KEY: value.GEMINI_API_KEY,
  RENIEC_TOKEN: value.RENIEC_TOKEN,
  CLOUDINARY_NAME: value.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: value.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: value.CLOUDINARY_API_SECRET,

  PUSHER_APP_ID: value.PUSHER_APP_ID,
  PUSHER_KEY: value.PUSHER_KEY,
  PUSHER_SECRET: value.PUSHER_SECRET,
  PUSHER_CLUSTER: value.PUSHER_CLUSTER,
}

export const envs = {
  port: envVariables.PORT,
  databaseUrl: envVariables.DATABASE_URL,
  jwtSecret: envVariables.JWT_SECRET,
  refreshJwtSecret: envVariables.JWT_REFRESH_SECRET,
  geminiApiKey: envVariables.GEMINI_API_KEY,
  reniecToken: envVariables.RENIEC_TOKEN,
  cloudinaryName: envVariables.CLOUDINARY_NAME,
  cloudinaryApiKey: envVariables.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: envVariables.CLOUDINARY_API_SECRET,

  // ✅ Exportar configuraciones de Pusher
  pusher: {
    appId: envVariables.PUSHER_APP_ID,
    key: envVariables.PUSHER_KEY,
    secret: envVariables.PUSHER_SECRET,
    cluster: envVariables.PUSHER_CLUSTER,
  },
}
