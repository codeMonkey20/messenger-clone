import Message from "@/models/Message";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getMessagesByCriteria(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  if (Object.keys(req.query).length > 0) {
    const queryKeys = Object.keys(req.query);
    if (!queryKeys.includes("fromUserID") && !queryKeys.includes("toUserID")) {
      res.status(400).json({ error: "Invalid Query Parameters" });
      return;
    }
  }

  const { fromUserID, toUserID } = req.query;
  const messages = await Message.find({
    $or: [
      { fromUserID, toUserID },
      { fromUserID: toUserID, toUserID: fromUserID },
    ],
  });
  const sorted = messages.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    if (aDate > bDate) return -1;
    else if (aDate < bDate) return 1;
    return 0;
  });
  res.status(200).json(sorted);
  res.end();
}
