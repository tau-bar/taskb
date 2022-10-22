import cors from "cors";
import express from "express";
import connection from "./config/db.config.js";
import { handleLogin, handleSignUp } from "./controller/controller.js";

const app = express();

connection.once('open', () => console.log('Database is connected.'))
connection.on('error', () => console.log('Could not connect to database.'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const router = express.Router();

app.use("/api/user", router).all((_, res) => {
	res.setHeader("content-type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
});

router.post("/createUser", handleSignUp);
router.post("/login", handleLogin);

app.listen(8001, () => console.log("User Service is listening on port 8001"));
