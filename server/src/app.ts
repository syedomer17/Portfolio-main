import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin: process.env.URL
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Hello World!');
});


app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.status(404).json({ message: "Not Found Router" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
