import { ReactNode } from "react";

const ChatList = ({ children }: { children: ReactNode }) => {
  return <section className={"grow overflow-y-auto"}>{children}</section>;
};
export default ChatList;
