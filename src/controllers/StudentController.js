import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const STUDENT = "STUDENT";
const ACTIVE = "ACTIVE";

export default {
  async listAllStudents(req, res) {
    try {
      const students = await prisma.student.findMany();
      return res.json(students);
    } catch (error) {
      return res.json({ error });
    }
  },
  async createStudent(req, res) {
    try {
      const { name, email, password, description, sex, code, classId } =
        req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          situation: ACTIVE,
          role: STUDENT,
          description,
          sex,
          updatedAt: new Date(),
        },
      });

      const activities = await prisma.activity.findMany({
        where: {
          classId: classId,
        },
      });

      await prisma.userOnClass.create({
        data: {
          classId,
          userId: newUser.id,
        },
      });

      const newStudent = await prisma.student.create({
        data: {
          code,
          userId: newUser.id,
        },
      });
      await prisma.activityOnStudent.createMany({
        data: activities.map((activity) => ({
          studentId: newStudent.id,
          activityId: activity.id,
          completed: false,
        })),
      });

      return res.json(newStudent);
    } catch (error) {
      res.json(error.message);
    }
  },
};
