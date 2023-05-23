import BoldText from "@/components/BoldText";
import useURLQuery from "@/hooks/useURLQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import { Skeleton } from "@/components/shadcn/skeleton";
import { useSession } from "next-auth/react";
import { User } from "@/types/User";

interface Props {
  firstName: string;
  lastName: string;
  displayPicture: string;
  id: number | string;
  online: boolean;
  typing?: boolean;
  lastMessage: string;
  receiverDetails: User;
}

const ChatItem = ({ firstName, lastName, displayPicture, id, online, typing, lastMessage, receiverDetails }: Props) => {
  const isExactID: boolean = useURLQuery(id, "id");
  const active: string = isExactID ? "bg-muted/60" : "";
  const session = useSession();
  const userSession = session.data?.user;
  if (userSession?._id !== id)
    return (
      <div
        className={`flex gap-3 p-2 rounded-xl cursor-pointer ${active} select-none transition-colors hover:bg-muted`}
      >
        <Avatar className={"h-12 w-12"}>
          <AvatarImage src={displayPicture ? displayPicture : "/Default_pfp.png"} />
          <AvatarFallback>
            <Skeleton className="h-12 w-12 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className={"flex flex-col"}>
          <BoldText>
            {firstName} {lastName} {online ? "(Online)" : "(Offline)"}
          </BoldText>
          {typing && receiverDetails._id === id ? (
            <div className="w-[54px] h-full rounded-full bg-muted/80 pt-2 pl-3">
              <div className="dot-typing"></div>
            </div>
          ) : (
            <span className={"text-sm font-thin"}>{`You: ${lastMessage}`}</span>
          )}
        </div>
      </div>
    );
  return <></>;
};
export default ChatItem;
