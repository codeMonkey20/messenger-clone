import { DetailedHTMLProps, HTMLAttributes, SVGProps } from "react";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {}

export default ({ children, className, ...props }: Props) => {
  return (
    <span className={`${className ? className : ""} font-semibold`} {...props}>
      {children}
    </span>
  );
};
