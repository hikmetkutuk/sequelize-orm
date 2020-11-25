import http from "http";
import express from "express";
import bodyParser from "body-parser";

import logging from "./web/config/logging";
import config from "./web/config/config";
import connect from "./web/config/database";

const NAMESPACE = "Server";
const router = express();

const db_name: string = config.database.name;
const db_user: string = config.database.user;
const db_password: string = config.database.password;

// Logging the request
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${
        req.method
    }], URL - [${
        req.url
    }], IP -[${
        req.socket.remoteAddress
    }]`);

    res.on("finish", () => {
        logging.info(NAMESPACE, `METHOD - [${
            req.method
        }], URL - [${
            req.url
        }], IP -[${
            req.socket.remoteAddress
        }], STATUS - [${
            res.statusCode
        }]`);

    })

    next();
})

// Parse the request
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

// Rules of API
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT")
        return res.status(200).json({});
    }

    next();
})

// Routes

// Error Handling
router.use((req, res, next) => {
    const error = new Error("not found");

    return res.status(404).json({message: error.message})
})

// Create the server
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running on ${
    config.server.hostname
}:${
    config.server.port
}`))

// Connect database
connect(db_name, db_user, db_password);
