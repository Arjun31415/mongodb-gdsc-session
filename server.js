import APIController from "./controllers/APIController.js";
import MainController from "./controllers/MainController.js";
import cors from "cors";
import dotenv from "dotenv";
// *********************************
// Import Dependencies
// *********************************
import express from "express";
import methodOverride from "method-override";
import morgan from "morgan";
// *********************************
// Enabling Enviromental Variables
// *********************************


dotenv.config();

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
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

  // *********************************
  // Routes that Render Pages with EJS
  // *********************************
  MainRoutes.get("/", mainController.index)// "/"
  MainRoutes.get("/error", mainController.error);

  // *********************************
  // API Routes that Return JSON
  // *********************************

  APIRoutes.get("/", apiController.example); //"/api"
  APIRoutes.get("/todos", apiController.getAllTodos);
  APIRoutes.post("/todos", apiController.postTodo);

  // *********************************
  // Server Listener
  // *********************************
  app.listen(PORT, () => console.log(`👂Listening on Port ${PORT}👂`));
