import * as http from "http";
import {App} from "./App";

console.log("this is server");


console.log(`server env: ${process.env.NODE_ENV}`);


const app = new App().express;

const port = 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port)
server.on('listening', onListening);

function onListening(): void {
	console.log(`Listening on port ${port}`);
}

