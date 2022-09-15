import { PrismaClient } from "@prisma/client";

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
      await prisma.activityOnStudent.createMany({
        data: students.map((student) => ({
          studentId: student.id,
          activityId: newActivity.id,
          completed: false,
        })),
      });

      return res.json(students);
    } catch (error) {
      res.json(error.message);
    }
  },
};
