import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const DATABASE_NAME = process.env.DATABASE_NAME || "sequelize_orm";
const DATABASE_USER = process.env.DATABASE_USER || "postgres";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "postgresadmin";

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const DATABASE = {
    name: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD
}

const config = {
    server: SERVER,
    database: DATABASE
}

export default config;
