import { Router } from "express";
import ClassController from "../controllers/ClassController.js";
import StudentController from "../controllers/StudentController.js";
import AdvisorController from "../controllers/AdvisorController.js";
import TeacherController from "../controllers/TeacherController.js";
import ActivityController from "../controllers/ActivityController.js";
import KnowledgeAreaController from "../controllers/KnowledgeAreaController.js";
import LoginUser from "../controllers/LoginUser.js";
import Midlewares from "../midlewares/auth.js";


const routes = new Router();


//class
routes.get("/classes", Midlewares.authRequiredAdvisor, ClassController.listAllClasses);
routes.post("/class", ClassController.createClass);

//student
routes.get("/students", StudentController.listAllStudents);
routes.get("/student/:studentId", StudentController.listUserStudent);
routes.post("/student", StudentController.createStudent);


//advisor
routes.get("/advisors", AdvisorController.listAllAdvisors);
routes.post("/advisor", AdvisorController.createAdvisor);

//teacher
routes.get("/teachers", TeacherController.listAllTeachers);
routes.post("/teacher", TeacherController.createTeacher);

//activity
 routes.get("/activities", ActivityController.listAllActivities);
 routes.post("/activity", ActivityController.createActivity);

 //knowledgeArea
routes.get("/knowledgeAreas/:userId", KnowledgeAreaController.listAllKnowledgeAreasByUserId);
routes.get("/knowledgeAreas", KnowledgeAreaController.createKnowledgeArea);

//login
routes.post("/login", LoginUser.loginUser);
export default routes;