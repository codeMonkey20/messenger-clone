import { DetailedHTMLProps, FormHTMLAttributes, forwardRef } from "react";

interface Props
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

const Form = forwardRef<HTMLFormElement, Props>(
  ({ children, ...props }: Props, ref) => {
    return (
      <form className={"lg:w-72 flex flex-col gap-3"} ref={ref} {...props}>
        {children}
      </form>
    );
  }
);
Form.displayName = "Form";
export default Form;
