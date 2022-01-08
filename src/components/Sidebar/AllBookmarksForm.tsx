import classNames from "classnames";
import React from "react";
import { Bookmark } from "../../model/Bookmark";
import { EditIcon } from "../icons/EditIcon";
import { GlobeIcon } from "../icons/GlobeIcon";

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
  const faviconClasses = classNames(["h-6", "w-6", "bg-white", "rounded-full"]);

  return (
    <div>
      <h2 className="mx-1 text-xl font-bold text-zinc-900 dark:text-white">
        All Bookmarks
      </h2>
      <div className="m-2">
        {Object.values(bookmarks).map((bookmark) => {
          return (
            <div
              key={bookmark.id}
              className="flex flex-row rounded-md items-center justify-between h-16 border dark:border-zinc-700 p-2 my-2"
            >
              {/* Left Hand Side */}
              <div className="flex flex-row items-center justify-start">
                <p className="font-semibold text-lg mx-2 text-zinc-900 dark:text-white">
                  {bookmark.name}
                </p>
              </div>

              {/* Right hand side */}
              <div className="flex flex-row items-center">
                <button
                  className="h-8 w-8 border dark:border-zinc-700 rounded-full flex justify-center items-center mx-2"
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
