import { createContext, useState } from "react";
import { Bookmark } from "../model/Bookmark";
import { v4 as uuidv4 } from "uuid";

export interface IBookmarkContext {
  bookmarks: Bookmark[];
  addBookmark: (
    // We do not include the ID here because our context will
    // Generate a new ID for us.
    bookmark: Pick<Bookmark, "name" | "url" | "useFavicon" | "simpleIconsSlug">
  ) => void;
  removeBookmark: (id: string) => void;
}

const BookmarkContext = createContext<IBookmarkContext>({} as IBookmarkContext);

export const BookmarkContextProvider: React.FC = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const addBookmark = (
    bookmark: Pick<Bookmark, "name" | "url" | "useFavicon" | "simpleIconsSlug">
  ) => {
    const id = uuidv4();
    const newBookmark: Bookmark = {
      id,
      ...bookmark,
    };
    setBookmarks((allBookmarks) => [...allBookmarks, newBookmark]);
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
