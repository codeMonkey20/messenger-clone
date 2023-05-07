import { HTMLAttributes } from "react";

const HigherOrderContent = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={"grow max-w-7xl mx-8"}>{children}</div>;
};
export default HigherOrderContent;
