import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

const server: any = express();

//
import usersRoutes from "./routes/users.routes";
//

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(cors());
server.use("/api/v1/users", usersRoutes);

server.listen(3000, () => {
    console.log("server is running on http://localhost:3000/");
});
