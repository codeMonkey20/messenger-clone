import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function hashCompare(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  if (Object.keys(req.body).length > 0) {
    const queryKeys = Object.keys(req.body);
    if (!queryKeys.includes("content") && !queryKeys.includes("hash")) {
      res.status(400).json({ error: "Invalid Query Parameters" });
      return;
    }
  }

  const { content, hash } = req.body;
  const match = await bcrypt.compare(content, hash);
  res.json({ match });
  res.end();
  return;
}
