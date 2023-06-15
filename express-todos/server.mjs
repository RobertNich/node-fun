import app from "./src/app.mjs";

const host = "localhost";
const port = 8080;

app.listen(8080, () => {
  console.log(`Server at ${host} on port ${port}`);
});
