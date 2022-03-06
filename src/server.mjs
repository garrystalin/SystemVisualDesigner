import express from "express";

const port = 3000;
const server = express();
server.use(express.static(process.cwd() + "/build"));

server.listen(port);
