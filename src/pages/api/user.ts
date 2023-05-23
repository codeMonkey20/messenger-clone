import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  _id: string;
  username: string;
  online: boolean;
  password?: string;
  firstName?: string;
  lastName?: string;
  socketID?: string;
};

const userAttributes = ["_id", "username", "online", "password", "firstName", "lastName", "socketID", "withPassword"];

export default async function getUserByCriteria(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  if (Object.keys(req.query).length > 0) {
    const queryKeys = Object.keys(req.query);
    if (!queryKeys.some((query) => userAttributes.includes(query))) {
      res.status(400).json({ error: "Invalid Query Parameters" });
      return;
    }
  }

  const { withPassword, ...userQueries } = req.query;
  const allUsers = await User.find(userQueries);
  if (withPassword === "false" || withPassword === undefined) {
    const allUsersWithoutPassword: User[] = [];
    allUsers.forEach(({ _id, online, username, firstName, lastName, socketID }: User) => {
      allUsersWithoutPassword.push({ _id, online, username, firstName, lastName, socketID });
    });
    res.status(200).json(allUsersWithoutPassword);
  } else {
    res.status(200).json(allUsers);
  }
  res.end();
}
