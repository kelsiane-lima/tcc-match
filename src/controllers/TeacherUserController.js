import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TEACHER = "TEACHER";
const ACTIVE = "ACTIVE";

export default {
  async listAllTeachers(req, res) {
    try {
      const teachers = await prisma.teacher.findMany();
      return res.json(teachers);
    } catch (error) {
      return res.json({ error });
    }
  },
  async createTeacher(req, res) {
    try {
      const { name, email, password, description, sex, classId } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          situation: ACTIVE,
          role: TEACHER,
          description,
          sex,
          updatedAt: new Date(),
        },
      });
      await prisma.userOnClass.create({
        data: {
          classId,
          userId: newUser.id,
        },
      });

      const newTeacher = await prisma.teacher.create({
        data: {
          userId: newUser.id,
        },
      });

      return res.json(newTeacher);
    } catch (error) {
      res.json(error.message);
    }
  },
};
