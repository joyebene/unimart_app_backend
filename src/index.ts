import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { Application, Request, Response, NextFunction } from "express";

import { createServer, Server } from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { AppDataSource } from "./connection/data-source";
import { config } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import rootRoute from "./route/rootRoute";
import { initSocket } from "./utils/socket";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";




// ---- Type augmentation ----
declare module "express-serve-static-core" {
    interface Request {
        user?: {
            id: string;
            email: string;
            isEmailVerified?: boolean;
        };
        admin?: {
            id: string;
            email: string;
        };
    }
}

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");

        const app = express();
        const httpServer = createServer(app);

        initSocket(httpServer);

        const redisClient = createClient({ url: config.REDIS_URL });
        await redisClient.connect();
        console.log("Redis connected successfully");

        const redisStore = new RedisStore({
            client: redisClient,
            prefix: "session:",
        });

        app.use(
            session({
                store: redisStore,
                secret: config.JWT_ACCESS_TOKEN!,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 24 * 60 * 60 * 1000,
                },
            })
        );


        app.use(express.json());
        app.use(cookieParser());

        app.use(
            cors({
                origin: true, // allow all origins
                credentials: true, // allow cookies or auth headers
                methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            })
        );

        routes(app);
        runApp(httpServer, Number(config.PORT));
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });

const routes = (app: Application) => {
    app.get("/whoami", (_req: Request, res: Response) => {
        res.json({ message: "Unimart API" });
    });

    app.use("/api/v1", rootRoute);

    app.use((_req, res) => {
        res.status(404).json({ message: "Page not found" });
    });

    app.use(errorHandler as (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => void);
};

const runApp = (server: Server, port: number) => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
