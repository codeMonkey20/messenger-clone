import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return <section className={"grow overflow-y-auto"}>{children}</section>;
};
