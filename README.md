# node-fun
Collection of different mini projects to help me get familiar with Node.
</br>

## reddit-cli
Grabs a random reddit post from the front page that is not a video post. </br>
If you set the `--print` flag then it will print the post title and link to the command line, else it opens a new window in your brower.
</br>

## simple-http-server
Doesn't really do too much, just responds depending on the method and path you're trying to access.
CD into the simple-http-server folder and run the server with `node index.mjs`. </br>
Use Httpie or whatever you like to run some test like: </br>
`http POST :8080/api/data name=Robert likes=Node`.
</br>

## simple-http-server
Simple todo database that has basic CRUD functionality. </br>
CD into the express-todos folder and run the server with `node server.mjs` </br>
Use Httpie or whatever you like to run some test. Some methods include:
- `http POST :8080/todo text="My first todo"`
- `http PUT :8080/todo text="Updating my first todo"`
- `http GET :8080/todo`
- `http GET :8080/todo/{todoId}`
- `http DELETE :8080/todo/{todoId}`
