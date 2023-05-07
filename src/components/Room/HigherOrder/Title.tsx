import { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"relative px-3 flex justify-between items-center"}>
      {children}
    </div>
  );
};
export default Title;
