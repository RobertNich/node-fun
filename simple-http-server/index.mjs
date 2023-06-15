import http from "http";
import url from "url";
import { HttpMethods, HttpStatusCodes } from "./httpUtils.mjs";

const host = "localhost";
const port = 8080;

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);

  switch (parsedUrl.pathname) {
    case "/api/data": {
      switch (request.method) {
        case HttpMethods.POST: {
          let body = "";
          request.on("data", (chunk) => {
            body += chunk;
          });
          request.on("end", () => {
            try {
              const data = JSON.parse(body);
              console.log(data);
              response.writeHead(HttpStatusCodes.OK, {
                "Content-Type": "application/json",
              });
              response.end(
                JSON.stringify({ status: "Received your POST", data })
              );
            } catch (error) {
              response.writeHead(HttpStatusCodes.BAD_REQUEST, {
                "Content-Type": "application/json",
              });
              response.end(JSON.stringify({ error: "Malformed JSON" }));
            }
          });
          break;
        }
        case HttpMethods.GET: {
          response.writeHead(HttpStatusCodes.OK, {
            "Content-Type": "application/json",
          });
          response.end(JSON.stringify({ status: "Received your GET method" }));
          break;
        }
        default: {
          response.writeHead(HttpStatusCodes.NOT_IMPLEMENTED, {
            "Content-Type": "application/json",
          });
          response.end(
            JSON.stringify({ error: "We don't support that method yet!" })
          );
          break;
        }
      }
      break;
    }
    default: {
      response.writeHead(HttpStatusCodes.NOT_FOUND, {
        "Content-Type": "application/json",
      });
      response.end(JSON.stringify({ error: "Not Found" }));
      break;
    }
  }
});

server.listen(port, host, () => {
  console.log(`Server at ${host} on port ${port}`);
});
