import { AlertTriangle, Info, Star } from "lucide-react";
import { HiroSVG } from "@/components/ui/icon";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "title" | "type" | "icon"
> & {
  title?: ReactNode;
  /**
   * @defaultValue info
   */
  type?: "tip" | "info" | "warn" | "help";
  icon?: ReactNode;
};

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, children, title, type = "info", icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "my-6 flex flex-row items-center gap-2 rounded-lg p-4 text-sm text-foreground",
          {
            tip: "bg-[#CEEFD0] dark:bg-background dark:border dark:border-[#CEEFD0]",
            info: "bg-[#B3D9FF] dark:bg-background dark:border dark:border-[#B3D9FF]",
            warn: "bg-[#FF9966] dark:bg-background dark:border dark:border-[#FF9966]",
            help: "bg-[#EBE9E6] dark:bg-background dark:border",
          }[type],
          className
        )}
        {...props}
      >
        {(!title && icon) ??
          {
            tip: null,
            info: null,
            warn: null,
            help: (
              <div className="bg-primary w-fit rounded-[4px] p-[0.275rem] text-white dark:text-neutral-950 [&_svg]:size-2">
                <HiroSVG />
              </div>
            ),
          }[type]}
        <div className="w-0 flex-1">
          <div
            className={cn(
              "flex flex-row items-center gap-2",
              title ? "mb-2" : "mb-0"
            )}
          >
            {title ? (
              <>
                {icon ??
                  {
                    tip: (
                      <Star className="size-4 stroke-foreground dark:stroke-[#CEEFD0] text-card" />
                    ),
                    info: (
                      <Info className="size-4 stroke-foreground dark:stroke-[#D1E8FF] text-card" />
                    ),
                    warn: (
                      <AlertTriangle className="size-4 stroke-foreground dark:stroke-[#FF9966] text-card" />
                    ),
                    help: (
                      <div className="bg-primary w-fit rounded-[4px] p-[0.275rem] text-white dark:text-neutral-950 [&_svg]:size-2">
                        <HiroSVG />
                      </div>
                    ),
                  }[type]}
                <div
                  className={cn(
                    "font-medium",
                    {
                      tip: "text-foreground dark:text-[#CEEFD0]",
                      info: "text-foreground dark:text-[#D1E8FF]",
                      warn: "text-foreground dark:text-[#FF9966]",
                      help: "font-bold text-foreground dark:text-[#EBE9E6]",
                    }[type]
                  )}
                >
                  {title}
                </div>
              </>
            ) : null}
          </div>
          <div
            className={cn(
              "callout [&_p]:m-0",
              type === "help" && "text-muted-foreground"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Callout.displayName = "Callout";
