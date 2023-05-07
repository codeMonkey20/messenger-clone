import { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export default ({...props}: Props) => {
  return <input className={"bg-muted/60 rounded-full grow h-9 pl-3 outline-none text-dark"} placeholder={"Aa"} {...props} />
}