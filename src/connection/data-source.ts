import { config } from "dotenv";
import path from "path";
import fs from "fs";
config();

import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm"


export const AppDataSource = new DataSource({
    type: "postgres",
    schema: "unimart",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: [`${__dirname}/../entity/*.{ts,js}`],
    migrations: [`${__dirname}/../migrations/*.{ts,js}`],
    ssl: process.env.DATABASE_SSL === "true"
        ? {
            rejectUnauthorized: true,
            ca: fs.readFileSync(path.resolve(__dirname, "../certs/prod-ca-2021.crt")).toString()
        }
        : false,
})

export const getRepository = <Entity extends ObjectLiteral>(
    target: EntityTarget<Entity>
): Repository<Entity> => {
    return AppDataSource.getRepository(target);
};