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

  async deleteActivity(req, res) {
    try {
      const { id } = req.params;
      const activity = await prisma.activity.delete({
        where: {
          id: Number(id),
        },
      });
      await prisma.activityOnStudent.deleteMany({
        where: {
          activityId: Number(id),
        },
      });

      return res.json(activity);
    } catch (error) {
      return res.json({ error });
    }
  },
  async updateActivity(req, res) {
    try {
      const { id } = req.params;
      const { name, description, deadline, title } = req.body;
      const activity = await prisma.activity.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          description,
          deadline,
          title,
          updatedAt: new Date(),
        },
      });
      return res.json(activity);
    } catch (error) {
      return res.json({ error });
    }
  },

  async advisorUpdateActivity(req, res) {
    try {
      const {activityId, studentId } = req.params;
      const { completed } = req.body;
    const activity = await prisma.activityOnStudent.update({
      where: {
        activityId: Number(activityId),
        studentId: Number(studentId)
      },
      data: {
        completed,
        updatedAt: new Date(),
      },
    });
    return res.json(activity);
    } catch (error) {
      return res.json({ error });
    
    }


}
}
