import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async listUserStudentByAdvisor(req, res) {
        try {
          const { advisorId } = req.params;
          const advisor = await prisma.advisor.findUnique({
            where: {
              id: parseInt(advisorId),
            },
          });
          const students = await prisma.student.findMany({
            where: {
              classId: advisor.classId,
            },
          });
          const studentList = [];
    
          for (let student of students) {
            const user = await prisma.user.findUnique({
              where: {
                id: student.userId,
              },
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
          return res.json(error.message);
        }
      },
      async candidacyStudentToAdvisor(req, res) {
        try {
          const {studentId, advisorId, evalued, description} = req.body;
          const student = await prisma.student.findUnique({
            where: {
              id: parseInt(studentId),
            },
          });
          const advisor = await prisma.advisor.findUnique({
            where: {
              id: parseInt(advisorId),
            },
          });
          const studentAdvisor = await prisma.studentOnAdvisor.create({
            data: {
              studentId: student.id,
              advisorId: advisor.id,
                evalued,
                description
            },
          });
          return res.json(studentAdvisor);
        } catch (error) {
          return res.json(error.message);
        }
      }
    }