import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async listAllClasses(req, res) {
    try {
      const classes = await prisma.class.findMany();
      return res.json(classes);
    } catch (error) {
      return res.json({ error });
    }
  },
  async createClass(req, res) {
    try {
      const { name, description, semester, year, course } = req.body;
      const newClass = await prisma.class.create({
        data: {
          name,
          description,
          semester,
          year,
          course,
          updatedAt: new Date()
        },
      });
      return res.json(newClass);
    } catch (error) {
      res.json(error.message);
    }
  },
};
