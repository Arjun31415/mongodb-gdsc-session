import Todo from "../models/Todo.js";

class APIController {
  constructor() {
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
  getAllTodos = (_, res) => {
    res.json(this.getTodosJSON());
  };

  createTodo = (req, res) => {
    const { text } = req.body;
    const todo = new Todo(text, new Date(), "0");
    this.todos.push(todo);
    res.json(this.getTodosJSON());
  };

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
