import classNames from "classnames";

export const desktopContainerClasses = classNames([
  "border",
  "dark:border-zinc-700",
  "p-2",
  "rounded-lg",
  "shadow",
  "hover:shadow-lg",
  "flex",
  "flex-col",
  "overflow-hidden",
  "cursor-pointer",
  "dark:bg-zinc-800",
  "h-48",
  "w-48",
]);

export const desktopIconClasses = classNames([
  "h-16",
  "w-16",
  "bg-white",
  "rounded-full",
  "flex",
  "flex-row",
  "items-center",
  "justify-center",
]);

export const mobileIconContainerClasses = classNames([
  "border",
  "dark:border-zinc-700",
  "p-2",
  "rounded-lg",
  "shadow",
  "hover:shadow-lg",
  "flex",
  "flex-col",
  "overflow-hidden",
  "cursor-pointer",
  "dark:bg-zinc-800",
  "h-16",
  "w-16",
  "grow",
  "justify-center",
  "items-center",
]);

export const mobileIconClasses = classNames([
  "h-12",
  "w-12",
  "flex",
  "flex-row",
  "items-center",
  "justify-center",
  "bg-white",
  "rounded-full",
]);

export const showForDesktop = classNames("hidden", "md:block");
export const showForMobile = classNames("block", "md:hidden");
