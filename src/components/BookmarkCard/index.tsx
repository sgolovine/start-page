import { BookmarkCardProps } from "./types";
import { useEffect, useMemo, useState } from "react";
import { SIMPLE_ICONS_CDN } from "../../constants/cdn";
import { GlobeIcon } from "../icons/GlobeIcon";
import iconColors from "../../config/si-color-map.json";
import { formatURL } from "../../helpers/formatUrl";
import {
  desktopIconClasses,
  mobileIconClasses,
  desktopIconContainerClasses,
  mobileIconContainerClasses,
  showForDesktop,
  showForMobile,
} from "./classes";

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  name,
  url,
  siSlug,
  useFavicon,
}) => {
  const [siSlugSVG, setSiSlugSVG] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchIcon = async () => {
      const res = await fetch(`${SIMPLE_ICONS_CDN}/${siSlug}.svg`);
      const svg = await res.text();
      setSiSlugSVG(svg);
    };

    if (siSlug) {
      fetchIcon();
    }
  }, []);

  const handleClick = () => window.location.assign(url);

  const renderIcon = () =>
    useMemo(() => {
      if (useFavicon) {
        const faviconUrl = `${url}/favicon.ico`;
        return (
          <img className={desktopIconClasses} src={faviconUrl} alt={name} />
        );
      }
      if (siSlug && siSlugSVG) {
        const hexColor =
          iconColors.colorMap[siSlug as keyof typeof iconColors.colorMap];
        return (
          <>
            <div className={showForDesktop}>
              <div
                style={{ fill: hexColor }}
                className={desktopIconClasses}
                dangerouslySetInnerHTML={{ __html: siSlugSVG ?? "" }}
              />
            </div>
            <div className={showForMobile}>
              <div
                style={{ fill: hexColor }}
                className={mobileIconClasses}
                dangerouslySetInnerHTML={{ __html: siSlugSVG ?? "" }}
              />
            </div>
          </>
        );
      }
      return (
        <>
          <div className={showForDesktop}>
            <div className={desktopIconClasses}>
              <GlobeIcon />
            </div>
          </div>
          <div className={showForMobile}>
            <div className={mobileIconClasses}>
              <GlobeIcon />
            </div>
          </div>
        </>
      );
    }, [useFavicon, siSlug, siSlugSVG]);

  return (
    <>
      {/* Desktop */}
      <div className={showForDesktop}>
        <div onClick={handleClick} className={desktopIconContainerClasses}>
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
              {formatURL(url)}
            </a>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className={showForMobile}>
        <div onClick={() => window.location.assign(url)}>
          <div className={mobileIconContainerClasses}>{renderIcon()}</div>
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
      </div>
    </>
  );
};
