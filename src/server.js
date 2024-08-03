import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan'
import path from "path";
import authRoutes from "./routes/auth.js"
import { fileURLToPath } from 'url';
import { register } from "./controllers/auth.js"
import userRoutes from "./routes/users.js"


/* APPLICATION & FILES SETTINGS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* LOCAL FILE STORAGE SETTINGS */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register)

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/* MONGODB SETUP */

const PORT = process.env.PORT || 5001;
mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
    app.listen(PORT, () => console.log(`Connected to ${PORT}`))
}) .catch((error) => console.log(`${error} did not connect to database!`))

app.get('/home', (req, res) => {
    res.json({
        success: true,
        message: "Welcome to home page!"
    });
});