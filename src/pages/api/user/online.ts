import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function userOnline(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") res.status(405).json({ error: "Method Not Allowed" });
  const { username } = req.query;
  if (!username) res.status(400).json({ error: "Missing username query" });
  const response = await User.findOneAndUpdate({ username }, { online: true }, { new: true });
  res
    .status(200)
    .json({
      data: { _id: response._id, username: response.username, online: response.online },
      message: "User updated to online.",
    });
  res.end();
}
