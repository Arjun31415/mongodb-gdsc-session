// *********************************
// Enabling Enviromental Variables
// *********************************
import dotenv from "dotenv";
dotenv.config();

// *********************************
// Import Dependencies
// *********************************
import express from "express";
import methodOverride from "method-override";
import cors from "cors";
import morgan from "morgan";
import MainController from "./controllers/MainController.js";
import APIController from "./controllers/APIController.js";
import { MongoClient, ServerApiVersion } from "mongodb";


// *********************************
// Global Variables & Controller Instantiation
// *********************************
const PORT = process.env.PORT || 3333;
const mainController = new MainController([]);
const apiController = new APIController([]);

// *********************************
// Creating Application Object
// *********************************
const app = express();

// *********************************
// Routers
// *********************************
const MainRoutes = express.Router();
const APIRoutes = express.Router();

// *********************************
// Middleware
// *********************************
// Global Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use("/static", express.static("static"));
app.use(morgan("tiny"));
app.use("/", MainRoutes);
app.use("/api", APIRoutes);
// Router Specific Middleware
APIRoutes.use(cors());

// *********************************
// Connect to MongoDB Atlas
// *********************************
// const MongoClient = mongodb.MongoClient;
// const mongoURI = process.env.MONGO_URI;
const mongoURI = "mongodb+srv://admin:gdscwebdev123@main.aw34pqu.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  

client.connect((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
    process.exit(1);
  }

  console.log("Connected to MongoDB Atlas");

  // *********************************
  // Routes that Render Pages with EJS
  // *********************************
  MainRoutes.get("/", mainController.index)// "/"
  MainRoutes.get("/error", mainController.error);

  // *********************************
  // API Routes that Return JSON
  // *********************************
  const db = client.db(process.env.MONGO_DB || "mydb");

  APIRoutes.get("/", apiController.example); //"/api"
  APIRoutes.get("/todos", async (req, res) => {
    const todos = await db.collection("todos").find().toArray();
    res.json(todos);
  });
  APIRoutes.post("/todos", async (req, res) => {
    const todo = req.body;
    await db.collection("todos").insertOne(todo);
    res.json(todo);
  });

  // *********************************
  // Server Listener
  // *********************************
  app.listen(PORT, () => console.log(`👂Listening on Port ${PORT}👂`));
});
