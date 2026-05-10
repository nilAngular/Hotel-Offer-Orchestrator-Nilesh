import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import hotelRoutes from "./routes/hotelRoutes";
import { env } from "node:process";
import { redisClient } from "./redis/redisCient";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(hotelRoutes);

const PORT = process.env.PORT ||3000;

async function startServer() {
    await redisClient.connect();
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

startServer();