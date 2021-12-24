import classNames from "classnames";
import React, { useMemo } from "react";
import simpleIcons from "simple-icons";
import { formatURL } from "../../helpers/formatUrl";
import { GlobeIcon } from "../icons/GlobeIcon";
import { BookmarkCardProps } from "./types";

export const BookmarkCardMobile: React.FC<BookmarkCardProps> = ({
  name,
  url,
  siSlug,
  useFavicon,
}) => {
  const simpleIcon = siSlug ? simpleIcons.Get(siSlug) ?? null : null;

  const iconContainerClasses = classNames([
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

  const iconClasses = classNames([
    "h-12",
    "w-12",
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
    <div onClick={() => window.location.assign(url)}>
      <div className={iconContainerClasses}>{renderIcon()}</div>
      <div className="w-16 pt-1 text-center">
        <h1 className="text-center text-xs font-semibold text-ellipsis line-clamp-1 dark:text-gray-50">
          {name}
        </h1>
        <a
          className="text-xs italic font-medium text-ellipsis line-clamp-1 dark:text-blue-200"
          href={url}
        >
          {formatURL(url)}
        </a>
      </div>
    </div>
  );
};
