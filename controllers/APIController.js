import { MongoClient, ServerApiVersion } from "mongodb";

import Todo from "../models/Todo.js";

class APIController {
  constructor() {
    const mongoURI = process.env.MONGO_URI;
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
    });
    this.db = client.db(process.env.MONGO_DB || "mydb");

    this.todos = [new Todo("helo", new Date(), "complete")];
  }
  getTodosJSON = () => {
    return this.todos.map((todo) => todo.toJSON());
  };

  example = (_, res) => {
    res.json({
      text: "This is an example API Route",
    });
  };
  getAllTodos = async (_, res) => {
    const todos = await this.db.collection("todos").find().toArray();
    res.json(todos);
  };

  createTodo = (req, res) => {
    const { text } = req.body;
    const todo = new Todo(text, new Date(), "0");
    this.todos.push(todo);
    res.json(this.getTodosJSON());
  };
  postTodo=async (req, res) => {
    const todo = req.body;
    await this.db.collection("todos").insertOne(todo);
    res.json(todo);
  }

  deleteTodoById = (req, res) => {
    const { id } = req.params;
    const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id));
    if (todoIndex !== -1) {
      this.todos.splice(todoIndex, 1);
    }
    res.sendStatus(204);
  };
}

export default APIController;
