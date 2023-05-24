import { ReactNode } from "react";

const ChatMenu = ({ children }: { children: ReactNode }) => {
  return (
    <section className={"border-r min-w-[16rem] max-h-screen w-96 px-1 pt-4 md:flex flex-col gap-3 hidden"}>
      {children}
    </section>
  );
};
export default ChatMenu;
