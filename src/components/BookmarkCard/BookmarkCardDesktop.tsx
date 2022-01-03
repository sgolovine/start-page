import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { GlobeIcon } from "../icons/GlobeIcon";
import { BookmarkCardProps } from "./types";
import iconColors from "../../config/si-color-map.json";

export const BookmarkCardDesktop: React.FC<BookmarkCardProps> = ({
  name,
  url,
  siSlug,
  useFavicon,
}) => {
  const [siSlugSVG, setSiSlugSVG] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchIcon = async () => {
      const res = await fetch(
        `https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/${siSlug}.svg`
      );
      const svg = await res.text();
      setSiSlugSVG(svg);
    };

    // Only do this if the bookmark has an SiSlug
    if (siSlug) {
      fetchIcon();
    }
  }, []);

  // useEffect(() => {
  //   console.log(siSlugSVG);
  // }, [siSlugSVG]);

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
      if (siSlug && siSlugSVG) {
        const hexColor = iconColors.colorMap;
        return (
          <div
            // style={{ fill: `#${simpleIcon.hex}` }}
            className={iconClasses}
            dangerouslySetInnerHTML={{ __html: siSlugSVG ?? "" }}
          />
        );
      }
      return (
        <div className={iconClasses}>
          <GlobeIcon />
        </div>
      );
    }, [useFavicon, siSlug, siSlugSVG]);

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
