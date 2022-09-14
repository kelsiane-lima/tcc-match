import { Router } from "express";
import ClassController from "./controllers/ClassController.js";
import StudentUserController from "./controllers/StudentUserController.js";
import AdvisorUserController from "./controllers/AdvisorUserController.js";
import TeacherUserController from "./controllers/TeacherUserController.js";

const routes = new Router();

//class
routes.get("/classes", ClassController.listAllClasses);
routes.post("/class", ClassController.createClass);

//student
routes.get("students", StudentUserController.listAllStudents);
routes.post("/student", StudentUserController.createStudent);


//advisor
routes.get("/advisors", AdvisorUserController.listAllAdvisors);
routes.post("/advisor", AdvisorUserController.createAdvisor);

//teacher
routes.get("/teachers", TeacherUserController.listAllTeachers);
routes.post("/teacher", TeacherUserController.createTeacher);



export default routes;