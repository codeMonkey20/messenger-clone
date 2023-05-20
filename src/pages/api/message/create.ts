import Message from "@/models/Message";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function createMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { message, fromUserID, toUserID } = req.body;
  if (!message) {
    res.status(400).json({ error: "Message is empty" });
    return;
  } else if (!fromUserID) {
    res.status(400).json({ error: "fromUserID is empty" });
    return;
  } else if (!toUserID) {
    res.status(400).json({ error: "toUserID is empty" });
    return;
  }

  const newMessage = await Message.create(req.body);
  res.status(200).json({ message: "Message added", data: newMessage });
  res.end();
}
