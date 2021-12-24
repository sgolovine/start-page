import classNames from "classnames";
import React, { useMemo, useState } from "react";
import simpleIcons from "simple-icons";
import { GearIcon } from "../icons/GearIcon";
import { GlobeIcon } from "../icons/GlobeIcon";

interface Props {
  name: string;
  url: string;
  siSlug?: string;
  useFavicon?: boolean;
  // onEdit?: () => void;
}

export const BookmarkCard: React.FC<Props> = ({
  name,
  url,
  siSlug,
  useFavicon,
  // onEdit,
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

    // Widths
    "w-32",
    "h-32",
    "lg:h-48",
    "lg:w-48",
  ]);

  const iconClasses = classNames([
    "h-12",
    "w-12",
    "lg:h-16",
    "lg:w-16",
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
        <h1 className="text-center lg:text-left text-sm font-bold text-ellipsis line-clamp-1 dark:text-gray-50">
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
