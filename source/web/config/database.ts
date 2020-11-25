import {Sequelize} from "sequelize";

import logging from "./logging";

const NAMESPACE = "PostgreSQL";

export default(name : string, user : string, password : string) => {
    const connect = () => {
        const sequelize = new Sequelize(name, user, password, {
            host: 'localhost',
            dialect: 'postgres'
        });

        try {
            sequelize.authenticate();
            logging.info(NAMESPACE, `Succesfully connected to ${NAMESPACE}`)

        } catch (error) {
            logging.error("Error connecting to database: ", error);
        }
    };
    connect();
}
