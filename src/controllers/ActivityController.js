import { PrismaClient } from "@prisma/client";
import StudentUserController from "./StudentUserController";
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
      await StudentUserController.listAllStudents.forEach((element) => {
         prisma.activityOnStudent.create({
          data: {
            studentId: element.id,
            activityId: newActivity.id,
            completed: "NO",
          },
        });
      });
      return res.json(newActivity);
    } catch (error) {
      res.json(error.message);
    }
  },
};
