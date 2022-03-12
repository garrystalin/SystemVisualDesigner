import express from "express";

const port = 3000;
const server = express();
server.use(express.static(process.cwd() + "/build"));

console.log("starting on http://localhost:3000")
server.listen(port);
