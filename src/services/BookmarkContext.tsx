import { createContext, useState } from "react";
import { Bookmark } from "../model/Bookmark";

export interface IBookmarkContext {
  bookmarks: Bookmark[];
  addBookmark: (
    // We do not include the ID here because our context will
    // Generate a new ID for us.
    bookmark: Bookmark
  ) => void;
  removeBookmark: (id: string) => void;
}

export const BookmarkContext = createContext<IBookmarkContext>(
  {} as IBookmarkContext
);

export const BookmarkProvider: React.FC = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks((allBookmarks) => [...allBookmarks, bookmark]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks((allBookmarks) =>
      allBookmarks.filter((bookmark) => bookmark.id !== id)
    );
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
