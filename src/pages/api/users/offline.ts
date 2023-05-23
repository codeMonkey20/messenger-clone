import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  _id: string;
  username: string;
  online: boolean;
  password?: string;
  firstName?: string;
  lastName?: string;
};

export default async function getAllOnlineUsers(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const allUsers = await User.find({ online: false });
  const allUsersWithoutPassword: User[] = [];
  allUsers.forEach(({ _id, online, username }: User) => {
    allUsersWithoutPassword.push({ _id, online, username });
  });
  res.status(200).json(allUsersWithoutPassword);
  res.end();
}
