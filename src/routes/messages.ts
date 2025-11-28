import express from "express";
import { authMiddleware } from "../middleware/auth";
import { AuthRequest } from "../types/express";
import { prisma } from "../lib/prisma";
import { SERVICE_M8_API_KEY } from "../lib/constants";

const router = express.Router();

const fetchJobDetails = async (uuid: string) => {
  const response = await fetch(
    `https://api.servicem8.com/api_1.0/job/${uuid}.json`,
    {
      headers: {
        "X-Api-Key": SERVICE_M8_API_KEY,
        Accept: "application/json",
      },
    }
  );

  const jobDetails = await response.json();
  return jobDetails;
};

router.post(
  "/:uuid/send-message",
  authMiddleware,
  async (req: AuthRequest, res) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });

      const { uuid } = req.params;
      const { message } = req.body;

      if (!message)
        return res.status(400).json({ error: "Message is required" });

      const jobDetails = await fetchJobDetails(uuid);

      const saved = await prisma.bookingMessage.create({
        data: {
          bookingUuid: uuid,
          bookingDescription: jobDetails.job_description,
          bookingStatus: jobDetails.status,
          userId: req.user.id,
          message,
        },
      });

      res.json(saved);
    } catch (err) {
      console.error("Error saving message:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/:uuid/get-messages",
  authMiddleware,
  async (req: AuthRequest, res) => {
    try {
      const { uuid } = req.params;

      const messages = await prisma.bookingMessage.findMany({
        where: { bookingUuid: uuid },
        orderBy: { createdAt: "asc" },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      res.json(messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const messages = await prisma.bookingMessage.findMany({
      where: { userId: req.user?.id },
      orderBy: { createdAt: "desc" },
    });

    const grouped: Record<
      string,
      { bookingUuid: string; bookingDescription: string }[]
    > = {};

    messages.forEach((msg) => {
      if (!grouped[msg.bookingUuid]) {
        grouped[msg.bookingUuid] = [
          {
            bookingUuid: msg.bookingUuid,
            bookingDescription: msg.bookingDescription,
          },
        ];
      }
    });

    res.json(grouped);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
