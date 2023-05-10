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
import { MongoClient } from 'mongodb';
import assert from 'assert';


// *********************************
// MongoDB Variable Declarations
// *********************************


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'todo';


// Create a new MongoClient
const client = new MongoClient(url);

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
// Routes that Render Pages with EJS
// *********************************
MainRoutes.get("/", mainController.index)// "/"
MainRoutes.get("/error", mainController.error);

// *********************************
// API Routes that Return JSON
// *********************************
APIRoutes.get("/", apiController.example); //"/api"
APIRoutes.get("/todos", apiController.getAllTodos);
APIRoutes.post("/todos", apiController.createTodo);

app.get("/", (req, res) => {
    // Get the documents collection
    const db = client.db(dbName);
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function (err, todos) {
        assert.equal(err, null);
        res.render('index', { todos: todos })
    });
});

// *********************************
// MongoDB Server Connection
// *********************************

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);

    // *********************************
    // Server Listener
    // *********************************
    app.listen(PORT, () => console.log(`👂Listening on Port ${PORT}👂`));

    console.log("Connected successfully to database server");

});



