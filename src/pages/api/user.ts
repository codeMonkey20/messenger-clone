import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    // create user
    case "POST":
      const { username, password, firstName, lastName } =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (!username && !password)
        res.status(400).json({ error: "Invalid username/pasword" });
      const user = await User.findOne({ username });
      if (user) res.status(409).json({ error: "Username exists" });
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        password: hash,
        firstName,
        lastName,
      });
      res.status(200).json({ message: "User added", data: newUser });
      break;

    // show user
    case "GET":
      break;

    // update user
    case "PUT":
      break;

    // delete user
    case "DELETE":
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
  res.end();
};
