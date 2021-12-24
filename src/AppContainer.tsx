import classNames from "classnames";
import React from "react";

const classes = classNames([
  "h-screen",
  "w-screen",
  "bg-white",
  "dark:bg-zinc-900",
  "transition-all",
]);

export const AppContainer: React.FC = ({ children }) => {
  return <div className={classes}>{children}</div>;
};
