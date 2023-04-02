import fetch from "node-fetch";

class MainController {
  constructor() {}

  index = (_, res) => {
    let todoRes = fetch("/api/todos", { method: "GET" }).then((res) =>
      res.json()
    );
    console.log(todoRes);
    res.render("index", { todos: todoRes });
  };

  error = (_, res) => {
    res.render("error", { message: "An error occurred" });
  };
}

export default MainController;
