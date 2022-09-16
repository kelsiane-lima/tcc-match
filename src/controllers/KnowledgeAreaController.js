import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    async listAllKnowledgeAreas(req, res) {
        try {
            const knowledgeAreas = await prisma.knowledgeArea.findMany();
            return res.json(knowledgeAreas);
        } catch (error) {
            return res.json({ error });
        }
    },
    async listAllKnowledgeAreasByUserId(req, res) {
        try {
            const { userId } = req.params;
            const knowledgeAreas = await prisma.knowledgeArea.findMany({
                where: {
                    userId: parseInt(userId),
                },
            });
            return res.json(knowledgeAreas);
        } catch (error) {
            return res.json({ error });
        }
    },
    async createKnowledgeArea(req, res) {
        try {
            const { name, description, userId} = req.body;
            const newKnowledgeArea = await prisma.knowledgeArea.create({
                data: {
                    name,
                    description,
                    userId,
                    updatedAt: new Date(),
                },
            });
            return res.json(newKnowledgeArea);
        } catch (error) {
            res.json(error.message);
        }
    }


};

