import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return <div className={"flex flex-col-reverse grow px-2 pb-2 overflow-y-auto"}>{children}</div>;
};
