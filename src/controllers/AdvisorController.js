import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

const ACTIVE = "ACTIVE";
const ADVISOR = "ADVISOR";

export default {
  async listAllAdvisors(req, res) {
    try {
      const advisors = await prisma.advisor.findMany();
      return res.json(advisors);
    } catch (error) {
      return res.json({ error });
    }
  },
  async listUserAdvisor(req, res) {
    try {
      const { advisorId } = req.params;
      const advisor = await prisma.advisor.findUnique({
        where: {
          id: parseInt(advisorId),
        },
      });
    
      const userAdvisor = await prisma.user.findUnique({
        where: {
          id: parseInt(advisor.userId),
        },
      });
      const userClass = await prisma.userOnClass.findMany({
        where: {
          userId: parseInt(student.userId),
        },
      });
      const userAdvisorInfo =  {
        id: advisor.id,
        name: userAdvisor.name,
        email: userAdvisor.email,
        situation: userAdvisor.situation,
        sex: userAdvisor.sex,
        listClass: userClass,
        lattesLink: advisor.lattesLink,
        createAt: userAdvisor.createdAt,
        updatedAt: userAdvisor.updatedAt,
        userId: advisor.userId
      }
     
      return res.json(userAdvisorInfo);
    } catch (error) {
      return res.json({ error });
    }
  },
  async createAdvisor(req, res) {
    try {
      const { name, email, password, description, sex, classId, lattesLink } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password:await bcrypt.hash(password, 8),
          situation: ACTIVE,
          role: ADVISOR,
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
      const newAdvisor = await prisma.advisor.create({
        data: {
          lattesLink,
          userId: newUser.id,
        },
      });
      return res.json(newAdvisor);
    } catch (error) {
      res.json(error.message);
    }
  },

  async studentOnAdvisor(req, res) {
    try {
      const { advisorId } = req.params;
      const { studentId, description } = req.body;
  
      const newStudentOnAdvisor = await prisma.studentOnAdvisor.create({
        data: {
          advisorId: parseInt(advisorId),
          studentId: parseInt(studentId),
          description,
          evaluated: false,
        },
      });
      return res.json(newStudentOnAdvisor);
    } catch (error) {
      return res.json({ error: error.message });

    } 
  }
};
