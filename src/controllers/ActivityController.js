import { PrismaClient } from "@prisma/client";
import StudentController from "./StudentController.js";
const prisma = new PrismaClient();

export default {
  async listAllActivities(req, res) {
    try {
      const activities = await prisma.activity.findMany();
      return res.json(activities);
    } catch (error) {
      return res.json({ error });
    }
  },
  async createActivity(req, res) {
    try {
      const { name, description, classId, deadline, title } = req.body;
      const newActivity = await prisma.activity.create({
        data: {
          name,
          title,
          deadline,
          description,
          classId,
          updatedAt: new Date(),
        },
      });

      const students = await prisma.student.findMany({});

      Object.values(students).forEach(async (element) => {
        await prisma.activityOnStudent.create({
          data: {
            studentId: element.id,
            activityId: newActivity.id,
            completed: false,
          },
        });
      });
      return res.json(students);
    } catch (error) {
      res.json(error.message);
    }
  },
};
