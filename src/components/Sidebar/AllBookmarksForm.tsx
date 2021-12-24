import classNames from "classnames";
import React from "react";
import simpleIcons from "simple-icons";
import { Bookmark } from "../../model/Bookmark";
import { EditIcon } from "../icons/EditIcon";
import { GlobeIcon } from "../icons/GlobeIcon";
import { TrashIcon } from "../icons/TrashIcon";

interface Props {
  bookmarks: {
    [id: string]: Bookmark;
  };
  onEditBookmark: (bookmark: Bookmark) => void;
}

export const AllBookmarksForm: React.FC<Props> = ({
  bookmarks,
  onEditBookmark,
}) => {
  const faviconClasses = classNames(["h-6", "w-6"]);

  const renderIcon = ({
    url,
    useFavicon,
    simpleIconSlug,
    name,
  }: {
    url?: string;
    useFavicon?: boolean;
    simpleIconSlug?: string;
    name?: string;
  }) => {
    const simpleIcon = simpleIconSlug
      ? simpleIcons.Get(simpleIconSlug) ?? null
      : null;

    if (useFavicon && url) {
      const faviconUrl = `${url}/favicon.ico`;
      return (
        <img
          className={faviconClasses}
          src={faviconUrl}
          alt={name ?? "favicon"}
        />
      );
    }

    if (simpleIcon) {
      return (
        <div
          style={{ fill: `#${simpleIcon.hex}` }}
          className={faviconClasses}
          dangerouslySetInnerHTML={{ __html: simpleIcon.svg }}
        />
      );
    }

    return (
      <div className={faviconClasses}>
        <GlobeIcon />
      </div>
    );
  };

  return (
    <div>
      <h2 className="mx-1 text-lg font-bold">All Bookmarks</h2>
      <div className="m-2">
        {Object.values(bookmarks).map((bookmark) => {
          return (
            <div
              key={bookmark.id}
              className="flex flex-row rounded-md items-center justify-between h-16 border p-2 my-2"
            >
              {/* Left Hand Side */}
              <div className="flex flex-row items-center justify-start">
                <div>
                  {renderIcon({
                    url: bookmark.url,
                    name: bookmark.name,
                    useFavicon: bookmark.useFavicon,
                    simpleIconSlug: bookmark.simpleIconsSlug,
                  })}
                </div>
                <p className="font-semibold text-lg mx-2">{bookmark.name}</p>
              </div>

              {/* Right hand side */}
              <div className="flex flex-row items-center">
                <button
                  className="h-8 w-8 border rounded-full flex justify-center items-center mx-2"
                  onClick={() => onEditBookmark(bookmark)}
                >
                  <EditIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
