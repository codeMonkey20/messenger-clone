import { ReactNode } from "react";

const ChatArea = ({ children }: { children: ReactNode }) => {
  return (
    <section className={"relative flex flex-col grow"}>{children}</section>
  );
};
export default ChatArea;
