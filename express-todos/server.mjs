import express from "express";
import bp from "body-parser";
import morgan from "morgan";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { HttpStatusCodes } from "../utils/httpUtils.mjs";

const database = new LowSync(new JSONFileSync("database.json"), {});
try {
  await database.read();
} catch (e) {
  console.error("Error reading database, initializing with empty object");
  database.data = { todos: [] };
}

const app = express();
const host = "localhost";
const port = 8080;

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("dev"));

app.post("/todo", (request, response) => {
  if (!request.body.text) {
    return response
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "Text is required" });
  }

  const newTodo = {
    id: Date.now(),
    text: request.body.text,
  };

  database.data.todos.push(newTodo);
  database.write();

  response.json(newTodo);
});

app.delete("/todo/:id", (request, response) => {
  const id = +request.params.id;
  const initialLength = database.data.todos.length;

  database.data.todos = database.data.todos.filter((todo) => todo.id !== id);
  database.write();

  if (database.data.todos.length === initialLength) {
    return response
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ error: "Todo not found" });
  }

  response.json({ success: `Todo with id: ${id} removed` });
});

app.put("/todo/:id", (request, response) => {
  if (!request.body.text) {
    return response
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "Text is required for update" });
  }

  const id = +request.params.id;
  const todo = database.data.todos.find((item) => item.id === id);

  if (!todo) {
    return response
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ error: "Todo not found" });
  }

  todo.text = request.body.text;
  database.write();

  response.json({ success: `Todo with id: ${id} updated`, data: todo });
});

app.get("/todo", (_request, response) => {
  response.json(database.data.todos);
});

app.get("/todo/:id", (request, response) => {
  const todo = database.data.todos.find((item) => {
    return item.id === +request.params.id;
  });

  if (!todo) {
    return response
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ error: "Todo not found" });
  }
  response.json({ data: todo });
});

app.use((error, _request, response, _next) => {
  console.error(error.stack);
  response
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "An unexpected error occurred" });
});

app.listen(8080, () => {
  console.log(`Server at ${host} on port ${port}`);
});
