import { Message } from "@/types/Messages";
import { Attributes } from "react";
import ChatBubble from "./ChatBubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import { Skeleton } from "@/components/shadcn/skeleton";

interface Props extends Attributes {
  chatData: Message;
  self?: boolean;
}

const ChatRow = ({ chatData, self }: Props) => {
  const { avatar, firstName, message } = chatData;

  return (
    <div
      className={`flex items-end gap-2 ${self ? "py-1 ml-16" : "py-2 mr-16"}`}
      style={{ flexDirection: self ? "row-reverse" : "row" }}
    >
      {self ? (
        <></>
      ) : (
        <div>
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar ? avatar : "/Default_pfp.png"} />
            <AvatarFallback>
              <Skeleton className="h-10 w-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      <div>
        <h1 className={"ml-3 text-sm text-muted-foreground/90"} style={{ display: self ? "none" : "block" }}>
          {firstName}
        </h1>
        <div className={"flex flex-col gap-[2px]"} style={{ alignItems: self ? "flex-end" : "flex-start" }}>
          <ChatBubble position={"all"} self={self}>
            {message}
          </ChatBubble>
        </div>
      </div>
    </div>
  );
};
export default ChatRow;
