import { PrismaClient } from "@prisma/client";

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
  async createAdvisor(req, res) {
    try {
      const { name, email, password, description, sex, classId, lattesLink } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
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
};
