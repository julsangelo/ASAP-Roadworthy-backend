import express from "express";
import dotenv from "dotenv";
import { AuthRequest } from "../types/express";
import { authMiddleware } from "../middleware/auth";
import { Readable } from "stream";
import { SERVICE_M8_API_KEY } from "../lib/constants";

const router = express.Router();

const fetchBookingAttachments = async (jobUuid: string) => {
  const url = `https://api.servicem8.com/api_1.0/attachment.json?$filter=related_object_uuid eq ${jobUuid}`;

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": SERVICE_M8_API_KEY,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch attachments for job ${jobUuid}`,
      response.status
    );
    return [];
  }

  const attachments = await response.json();
  return attachments;
};

router.get("/view-attachment/:uuid", authMiddleware, async (req, res) => {
  try {
    const { uuid } = req.params;
    const fileUrl = `https://api.servicem8.com/api_1.0/attachment/${uuid}.file`;

    const response = await fetch(fileUrl, {
      headers: {
        "X-Api-Key": SERVICE_M8_API_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );

    const nodeStream = Readable.fromWeb(response.body as any);
    nodeStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch attachment" });
  }
});

router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const sm8Uuid = req.user.sm8Uuid;

    if (!sm8Uuid) {
      return res
        .status(400)
        .json({ error: "ServiceM8 UUID not found for user" });
    }

    const jobUrl = `https://api.servicem8.com/api_1.0/job.json?$filter=company_uuid eq ${sm8Uuid}`;

    const sm8Response = await fetch(jobUrl, {
      headers: {
        "X-Api-Key": SERVICE_M8_API_KEY,
        Accept: "application/json",
      },
    });

    if (!sm8Response.ok) {
      const text = await sm8Response.text();
      console.error("ServiceM8 response:", text);
      return res
        .status(500)
        .json({ error: "Failed to fetch jobs from ServiceM8" });
    }

    const jobs = await sm8Response.json();

    const jobsWithAttachments = await Promise.all(
      jobs.map(async (job: any) => {
        const attachments = await fetchBookingAttachments(job.uuid);
        return { ...job, attachments };
      })
    );

    res.status(200).json(jobsWithAttachments);
  } catch (err) {
    console.error("Error in /get-jobs:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
