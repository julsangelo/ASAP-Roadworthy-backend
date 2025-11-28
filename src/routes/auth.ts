import express from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { extractToken } from "../lib/utils";
import {
  COOKIE_NAME,
  JWT_SECRET,
  NODE_ENV,
  SERVICE_M8_API_KEY,
} from "../lib/constants";

const router = express.Router();

router.use(cookieParser());

router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Invalid email or phone and password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ error: "Invalid email or phone and password" });
    }

    const url = `https://api.servicem8.com/api_1.0/companycontact.json?$filter=email eq ${user.email}`;

    const sm8Response = await fetch(url, {
      headers: {
        "X-Api-Key": SERVICE_M8_API_KEY,
        Accept: "application/json",
      },
    });

    if (!sm8Response.ok) {
      return res
        .status(500)
        .json({ error: "Failed to verify user with ServiceM8" });
    }

    const client = await sm8Response.json();

    const clientUuid = client[0].company_uuid;

    if (!clientUuid) {
      return res.status(404).json({ error: "User not found in ServiceM8" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { sm8Uuid: clientUuid },
    });

    const token = jwt.sign({ sm8Uuid: clientUuid }, JWT_SECRET, {
      expiresIn: "1h",
    });

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logged in successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies[COOKIE_NAME];

    if (token) {
      await prisma.session.deleteMany({
        where: {
          token: token,
        },
      });
    } else {
      return res.status(400).json({ error: "No active session found" });
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/check-session", async (req, res) => {
  try {
    const token = extractToken(req) || req.cookies[COOKIE_NAME];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }

    const session = await prisma.session.findFirst({
      where: { token },
      include: { user: true },
    });

    if (!session) return res.status(401).json({ error: "Session not found" });

    res.status(200).json({
      message: "Session valid",
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        phone: session.user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
