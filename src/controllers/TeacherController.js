import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

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
          password: await bcrypt.hash(password, 8),
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
  async listAllAdvisorInClass(req, res) {
    try {
      const { classId } = req.params;
      const advisors = await prisma.teacher.findMany({
        where: {
          userOnClass: {
            some: {
              classId: Number(classId),
            },
          },
        },
      });
      return res.json(advisors);
    } catch (error) {
      return res.json({ error });
    }
  }
  
};
