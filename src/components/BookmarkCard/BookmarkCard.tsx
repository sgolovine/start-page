import React, { useMemo, useState } from "react";
import simpleIcons from "simple-icons";
import { GearIcon } from "../icons/GearIcon";
import { GlobeIcon } from "../icons/GlobeIcon";

interface Props {
  name: string;
  url: string;
  siSlug?: string;
  useFavicon?: boolean;
  onEdit?: () => void;
}

export const BookmarkCard: React.FC<Props> = ({
  name,
  url,
  siSlug,
  useFavicon,
  onEdit,
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const simpleIcon = siSlug ? simpleIcons.Get(siSlug) ?? null : null;

  const handleEdit = (e: any) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  const renderSi = () =>
    useMemo(() => {
      if (simpleIcon) {
        return (
          <div
            style={{ fill: `#${simpleIcon.hex}` }}
            className="h-16 w-16 mx-auto"
            dangerouslySetInnerHTML={{ __html: simpleIcon.svg }}
          />
        );
      } else {
        return <GlobeIcon />;
      }
    }, [simpleIcon]);

  const renderFavicon = () => {
    if (useFavicon) {
      const faviconUrl = `${url}/favicon.ico`;
      return <img className="h-16 w-16 mx-auto" src={faviconUrl} alt={name} />;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => window.location.assign(url)}
      className="h-48 w-48 border p-2 rounded-lg shadow hover:shadow-lg flex flex-col overflow-hidden cursor-pointer"
    >
      <div className="flex flex-row items-center justify-end h-8">
        {isHovering && (
          <button className="p-2 rounded-full" onClick={handleEdit}>
            <GearIcon />
          </button>
        )}
      </div>
      <div className="flex grow justify-center pt-2">
        {useFavicon ? renderFavicon() : renderSi()}
      </div>
      <div className="flex flex-col">
        <h1 className="text-sm font-bold text-ellipsis line-clamp-1">{name}</h1>
        <a
          className="text-xs italic font-medium text-ellipsis line-clamp-1"
          href={url}
        >
          {url}
        </a>
      </div>
    </div>
  );
};
