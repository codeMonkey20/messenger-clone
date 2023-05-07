import { ReactNode } from "react";

const ChatAreaHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"w-full p-3 flex justify-between shadow"}>{children}</div>
  );
};
export default ChatAreaHeader;
