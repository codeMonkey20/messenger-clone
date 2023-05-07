import { DetailedHTMLProps, HTMLAttributes, SVGProps } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {}

const PrimaryText = ({ children, className, ...props }: Props) => {
  return (
    <span className={`${className ? className : ""} text-primary`} {...props}>
      {children}
    </span>
  );
};
export default PrimaryText;
