import { Router } from "express";
import ClassController from "./controllers/ClassController.js";
import UserStudentController from "./controllers/UserStudentController.js";

const routes = new Router();

routes.get("/classes", ClassController.listAllClasses);
routes.post("/class", ClassController.createClass);
routes.post("/student", UserStudentController.createStudent);


export default routes;