import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return <section className={"relative flex flex-col grow"}>{children}</section>;
};
