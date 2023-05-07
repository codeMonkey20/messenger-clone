import Image from "next/image";
import BoldText from "@/components/BoldText";
import useURLQuery from "@/hooks/useURLQuery";

interface Props {
  firstName: string;
  lastName: string;
  displayPicture: string;
  id: number | string;
}

const ChatItem = ({ firstName, lastName, displayPicture, id }: Props) => {
  const isExactID: boolean = useURLQuery(id, "id");
  const active: string = isExactID ? "bg-muted/60" : "";
  return (
    <div
      className={`flex gap-3 p-2 rounded-xl cursor-pointer ${active} select-none transition-colors hover:bg-muted`}
    >
      <Image
        src={displayPicture}
        alt="DP"
        width={48}
        height={48}
        className={"rounded-full border"}
      />
      <div className={"flex flex-col"}>
        <BoldText>
          {firstName} {lastName}
        </BoldText>
        <span className={"text-sm font-thin"}>Send Nudes</span>
      </div>
    </div>
  );
};
export default ChatItem;
