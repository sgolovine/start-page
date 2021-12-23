import React, { createContext, useEffect } from "react";
import { omitKey } from "../helpers/omitKey";
import { usePersistedReducer } from "../hooks/usePersistedReducer";
import { Bookmark } from "../model/Bookmark";
import { AppAction } from "../model/Context";

interface BookmarkState {
  bookmarks: {
    [key: string]: Bookmark;
  };
}

interface BookmarkContext {
  state: BookmarkState;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
}

export const initialState = {
  bookmarks: {},
};

enum ActionTypes {
  AddBookmark = "ADD_BOOKMARK",
  RemoveBookmark = "REMOVE_BOOKMARK",
}

export function reducer(
  state: BookmarkState = initialState,
  action: AppAction<ActionTypes>
): BookmarkState {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarks: {
          ...state.bookmarks,
          [action.payload.id]: action.payload,
        },
      };
    case "REMOVE_BOOKMARK": {
      return {
        ...state,
        bookmarks: omitKey(action.payload, state.bookmarks),
      };
    }
    default:
      return state;
  }
}

export const BookmarkContext = createContext<BookmarkContext>(
  {} as BookmarkContext
);

export const BookmarkProvider: React.FC = ({ children }) => {
  const { state, dispatch } = usePersistedReducer(
    reducer,
    { bookmarks: {} },
    "bookmarks"
  );

  const addBookmark = (bookmark: Bookmark) => {
    dispatch({
      type: ActionTypes.AddBookmark,
      payload: bookmark,
    });
  };

  const removeBookmark = (id: string) => {
    dispatch({
      type: ActionTypes.RemoveBookmark,
      payload: id,
    });
  };

  return (
    <BookmarkContext.Provider
      value={{
        state,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
