import fetch from "node-fetch";

class MainController {
  constructor() {}

  index = async (req, res) => {
    console.log("url", req.get("host"));
    const domain = req.get("host");
    const fetchURL = new URL("/api/todos", "http://" + domain);
    let todoRes = await fetch(fetchURL, { method: "GET" }).then((res) => {
      return res.json();
    });
    // console.log(todoRes);
    res.render("index", { todos: todoRes });
  };

  error = (_, res) => {
    res.render("error", { message: "An error occurred" });
  };
}

export default MainController;
