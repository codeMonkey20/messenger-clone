import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  self?: boolean;
  position: "top" | "mid" | "bot" | "all";
}

const ChatBubble = ({ children, position, self }: Props) => {
  return (
    <div className={`py-2 px-3 w-fit bubble-${position}${self ? "-self" : ""}`}>
      <p className={"max-w-lg"}>{children}</p>
    </div>
  );
};
export default ChatBubble;
