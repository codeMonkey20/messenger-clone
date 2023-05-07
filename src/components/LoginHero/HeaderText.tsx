import { HTMLAttributes } from "react";

const HeaderText = ({ children }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <div className={"lg:w-96"}>
      <h1
        className={
          "py-3 gradient-text font-semibold tracking-tight lg:tracking-tighter leading-[3rem] lg:leading-[5rem] text-[3.2rem] lg:text-[5rem] text-center lg:text-left"
        }
      >
        {children}
      </h1>
    </div>
  );
};
export default HeaderText;
