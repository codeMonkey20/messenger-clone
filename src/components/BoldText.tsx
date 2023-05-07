import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {}

const BoldText = ({ children, className, ...props }: Props) => {
  return (
    <span className={`${className ? className : ""} font-bold`} {...props}>
      {children}
    </span>
  );
};
export default BoldText;
