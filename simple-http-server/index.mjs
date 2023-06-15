import http from "http";
import { HttpMethods, HttpStatusCodes } from "./httpUtils.mjs";

const host = "localhost";
const port = 8080;

const server = http.createServer((request, response) => {
  switch (request.method) {
    case HttpMethods.POST: {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("close", () => {
        console.log(JSON.parse(body));
      });
      response.writeHead(HttpStatusCodes.OK);
      response.end("Received your POST");
      break;
    }
    case HttpMethods.GET: {
      response.writeHead(HttpStatusCodes.OK);
      response.end("Received your GET method");
      break;
    }
    default: {
      response.writeHead(HttpStatusCodes.OK);
      response.end("We don't support that method yet!");
      break;
    }
  }
});

server.listen(port, host, () => {
  console.log(`Server on ${host} at port ${port}`);
});
