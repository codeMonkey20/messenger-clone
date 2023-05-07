import { HTMLAttributes } from "react";

const Content = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={"flex justify-center"}>
      <div
        className={
          "mt-32 flex flex-col max-w-[480px] lg:max-w-7xl lg:grow lg:flex lg:flex-row lg:justify-between lg:gap-12"
        }
      >
        {children}
      </div>
    </div>
  );
};
export default Content;
