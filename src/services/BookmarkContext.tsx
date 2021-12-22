import { createContext, useState } from "react";
import { Bookmark } from "../model/Bookmark";
import { useLocalStorage } from "./useLocalStorage";

const LOCAL_STORAGE_KEY = "bookmarks";

export interface IBookmarkContext {
  bookmarks: Bookmark[];
  addBookmark: (
    // We do not include the ID here because our context will
    // Generate a new ID for us.
    bookmark: Bookmark
  ) => void;
  removeBookmark: (id: string) => void;
  editBookmark: (bookmark: Bookmark) => void;
}

export const BookmarkContext = createContext<IBookmarkContext>(
  {} as IBookmarkContext
);

export const BookmarkProvider: React.FC = ({ children }) => {
  const { storedValue: bookmarks, setValue: setBookmarks } = useLocalStorage<
    Bookmark[]
  >(LOCAL_STORAGE_KEY, []);

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  const editBookmark = (bookmark: Bookmark) => {
    setBookmarks(bookmarks.map((b) => (b.id === bookmark.id ? bookmark : b)));
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        editBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
