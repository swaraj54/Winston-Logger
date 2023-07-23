import express from 'express';
import { logger } from './logger.js';

const app = express();

app.use((req, res, next) => {
    logger.info(` REQ METHOD -> ${req.method}, URL -> ${req.url}`);
    next();
})

app.get("/", (req, res) => {
    try {
        throw new Error("This is test Error")
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({ error: "Test error" })
    }
})

app.post("/login", (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            logger.error("User name is required!")
            return res.send("User name is required!")
        }
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({ error: "Test error" })
    }
})

app.listen(8000, () => {
    console.log("Server is running on port 8000")
})