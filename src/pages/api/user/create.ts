import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { username, password, firstName, lastName, avatar, socketID } =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  if (!username && !password) {
    res.status(400).json({ error: "Invalid username/password" });
    return;
  }

  const user = await User.findOne({ username });
  if (user) {
    res.status(409).json({ error: "Username exists" });
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    password: hash,
    firstName,
    lastName,
    online: false,
    avatar,
    socketID,
  });

  res.status(200).json({ message: "User added", data: newUser });
  res.end();
}
