import type { HTMLAttributes } from "react"
import { cn } from "@/utils/cn"

function Wrapper(props: HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      {...props}
      className={cn(
        "rounded-xl bg-gradient-to-br from-slate-500 to-orange-500 p-2 prose-no-margin",
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

export { Wrapper }
