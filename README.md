# node-fun
Collection of different mini projects to help me get familiar with Node.

## reddit-cli
Grabs a random reddit post from the front page that is not a video post. </br>
If you set the `--print` flag then it will print the post title and link to the command line, else it opens a new window in your brower.

## simple-http-server
Doesn't really do too much, just responds depending on the method and path you're trying to access.
You can run the server with `node index.mjs` and then using something like `Httpie` do a post method: </br>
`http POST :8080/api/data name=Robert likes=Node`.
