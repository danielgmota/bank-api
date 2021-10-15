import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/account.routes.js';
import {promises as fs} from 'fs';
import cors from 'cors';

global.fileName = "accounts.json";

const { readFile, writeFile } = fs;
const {combine, timestamp, label, printf } = winston.format;
const formatLog = printf(({level, message, label, timestamp}) => {
    return `${timestamp} - ${label} / ${level}: ${message}`;
})

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "account-api.log" })
    ],
    format: combine(
        label({ label: "my-bank-api"}),
        timestamp(),
        formatLog
    )
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/account", accountsRouter);
app.listen(port, async () => {
    try {
        await readFile(global.fileName);
        logger.info("Api iniciada");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        writeFile(global.fileName, JSON.stringify(initialJson)).them(() => {
            logger.info("Arquivo criado e API iniciada");
        }).catch(err => {
            logger.error(err);
        });
    }
});