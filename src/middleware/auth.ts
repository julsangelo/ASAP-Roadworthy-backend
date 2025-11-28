import { Response, NextFunction, Request } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../types/express";
import { COOKIE_NAME } from "../lib/constants";
import { extractToken } from "../lib/utils";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token)
      return res.status(401).json({ error: "Unauthorized: No token provided" });

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid session" });
    }

    if (!session.user.sm8Uuid) {
      console.warn(
        "User logged in but has no ServiceM8 UUID:",
        session.user.id
      );
    }

    req.user = session.user;
    next();
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};
