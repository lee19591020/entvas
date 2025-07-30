import dotenv from 'dotenv'

dotenv.config();

export const config = {
    PORT: process.env.PORT as string,
    JWT: process.env.JWT as string,
    DB_URL_ADMIN: process.env.DB_URL_ADMIN as string,
}