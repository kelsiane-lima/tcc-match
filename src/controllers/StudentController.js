import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const STUDENT = "STUDENT";
const ACTIVE = "ACTIVE";

export default {
  async listAllStudents(req, res) {
    try {
      const students = await prisma.student.findMany();
      const studentList = [];

      for (let student of students) {
        const user = await prisma.user.findUnique({
          where: { id: student.userId },
        });
        const studentData = {
          id: student.id,
          code: student.code,
          name: user.name,
          email: user.email,
          situation: user.situation,
          sex: user.sex,
          createAt: user.createdAt,
          updatedAt: user.updatedAt,
          userId: student.userId,
        };
        studentList.push(studentData);
      }

      return res.json(studentList);
    } catch (error) {
      return res.json({ error });
    }
  },

  async listUserStudent(req, res) {
    try {
      const { studentId } = req.params;
      const student = await prisma.student.findUnique({
        where: {
          id: parseInt(studentId),
        },
      });

      const userStudent = await prisma.user.findUnique({
        where: {
          id: parseInt(student.userId),
        },
      });

      const userStudentInfo = {
        id: student.id,
        name: userStudent.name,
        email: userStudent.email,
        situation: userStudent.situation,
        sex: userStudent.sex,
        code: student.code,
        createAt: userStudent.createdAt,
        updatedAt: userStudent.updatedAt,
        userId: student.userId,
      };

      return res.json(userStudentInfo);
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
          password: await bcrypt.hash(password, 8),
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
