import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {

   async authRequired(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
             return res.status(401).json({ error: "No token provided" });
        }
        const parts = authHeader.split(" ");
        if (parts.length !== 2) {
             return res.status(401).json({ error: "Token error" });
        }
        const [scheme, token] = parts;
        if (!/^Bearer$/i.test(scheme)) {
             return res.status(401).json({ error: "Token malformatted" });
        }

        jwt.verify(token, authConfig.secret, (err, decoded) => {
             if (err) return res.status(401).json({ error: "Token invalid or expired" });
            console.log(decoded.id);
             req.userId = decoded.id;
             return next();
        });
     },

     async authRequiredAdvisor(req, res, next) {
            const authHeader = req.headers.authorization;
     
            if (!authHeader) {
                return res.status(401).json({ error: "No token provided" });
            }
            const parts = authHeader.split(" ");
            if (parts.length !== 2) {
                return res.status(401).json({ error: "Token error" });
            }
            const [scheme, token] = parts;
            if (!/^Bearer$/i.test(scheme)) {
                return res.status(401).json({ error: "Token malformatted" });
            }
     
            jwt.verify(token, authConfig.secret, async (err, decoded) => {
                if (err) return res.status(401).json({ error: "Token invalid or expired" });

               const user = await prisma.user.findUnique({
                         where: {
                               id: Number(decoded.id)
                         }
                    })

                if(user.role !== "ADVISOR") return res.status(401).json({ error: "User is not an advisor" });
                return next();
            });
       }


}