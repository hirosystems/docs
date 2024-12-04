import { cn } from "@/lib/utils";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-cyan-600/20 p-1 py-0.5 font-bold text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-600",
        className
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const FeatureCard = ({
  description,
  name,

  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "flex w-72 shrink-0 cursor-pointer snap-center snap-always flex-col justify-between rounded-xl p-4 shadow-xl shadow-black/[0.1] lg:min-w-96",
        // light styles
        " border border-neutral-200 bg-white",
        // dark styles
        "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}
      {...props} // Spread the rest of the props here
    >
      <div className="select-none font-normal text-neutral-700 dark:text-neutral-400">
        {description}
      </div>

      <div className="select-none">
        <div className="flex flex-row py-1"></div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-sm font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  );
};
