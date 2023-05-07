import { ReactNode } from "react";

const ChatMenu = ({ children }: { children: ReactNode }) => {
  return (
    <section className={"border-r w-96 px-1 pt-4 flex flex-col gap-3 "}>
      {children}
    </section>
  );
};
export default ChatMenu;
