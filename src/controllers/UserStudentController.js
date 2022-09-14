import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      const { name, email, password, description, sex, code, classId } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          situation: "ACTIVE",
          role: "STUDENT",
          description,
          sex,
          updatedAt: new Date(),      
        }
      });
       await prisma.userOnClass.create({
        data:{
            classId,
            userId: newUser.id
        }
      })

      const newStudent = await prisma.student.create({
        data:{
            code,
            userId: newUser.id
        }
      })
      return res.json(newStudent);
    } catch (error) {
      res.json(error.message);
    }
  }
};
