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
    const todo = { id: this.todos.length + 1, text };
    this.todos.push(todo);
    res.json(todo);
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
