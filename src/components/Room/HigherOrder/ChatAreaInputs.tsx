import { ReactNode } from "react";

const ChatAreaInputs = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"p-3 flex items-center gap-1 text-primary"}>{children}</div>
  );
};
export default ChatAreaInputs;
