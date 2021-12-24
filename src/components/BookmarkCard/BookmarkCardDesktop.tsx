import classNames from "classnames";
import React, { useMemo } from "react";
import simpleIcons from "simple-icons";
import { GlobeIcon } from "../icons/GlobeIcon";
import { BookmarkCardProps } from "./types";

export const BookmarkCardDesktop: React.FC<BookmarkCardProps> = ({
  name,
  url,
  siSlug,
  useFavicon,
}) => {
  const simpleIcon = siSlug ? simpleIcons.Get(siSlug) ?? null : null;

  const containerClasses = classNames([
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

  const iconClasses = classNames([
    "h-16",
    "w-16",
    "mx-auto",
    "bg-white",
    "rounded-full",
  ]);

  const renderIcon = () =>
    useMemo(() => {
      if (useFavicon) {
        const faviconUrl = `${url}/favicon.ico`;
        return <img className={iconClasses} src={faviconUrl} alt={name} />;
      }
      if (simpleIcon) {
        return (
          <div
            style={{ fill: `#${simpleIcon.hex}` }}
            className={iconClasses}
            dangerouslySetInnerHTML={{ __html: simpleIcon.svg }}
          />
        );
      }
      return (
        <div className={iconClasses}>
          <GlobeIcon />
        </div>
      );
    }, [useFavicon, simpleIcon]);

  return (
    <div
      onClick={() => window.location.assign(url)}
      className={containerClasses}
    >
      <div className="flex grow justify-center items-center">
        {renderIcon()}
      </div>
      <div className="flex flex-col">
        <h1 className="text-left text-sm font-bold text-ellipsis line-clamp-1 dark:text-gray-50">
          {name}
        </h1>
        <a
          className="text-xs italic font-medium text-ellipsis line-clamp-1 dark:text-blue-200"
          href={url}
        >
          {url}
        </a>
      </div>
    </div>
  );
};
