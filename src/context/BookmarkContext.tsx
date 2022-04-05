import React, { createContext } from "react"
import { LocalStorageKeys } from "../constants/localStorage"
import { getGuid } from "../helpers/getGuid"
import { omitKey } from "../helpers/omitKey"
import { usePersistedReducer } from "../hooks/usePersistedReducer"
import { Bookmark } from "../model/Bookmark"
import { AppAction } from "../model/Context"

interface BookmarkState {
  bookmarks: {
    [key: string]: Bookmark
  }
}

interface BookmarkContext {
  state: BookmarkState
  addBookmark: (bookmark: Bookmark) => void
  removeBookmark: (id: string) => void
  debugAddBookmarks: (numberOfBookmarks: number) => void
  debugClearBookmarks: () => void
  restoreBookmarks: (state: BookmarkState) => void
}

export const initialState = {
  bookmarks: {},
}

enum ActionTypes {
  AddBookmark = "ADD_BOOKMARK",
  RemoveBookmark = "REMOVE_BOOKMARK",
  DebugAddBookmarks = "DEBUG_ADD_BOOKMARKS",
  DebugClearBookmarks = "DEBUG_CLEAR_BOOKMARKS",
  RestoreBookmarks = "RESTORE_BOOKMARKS",
}

function createMockBookmark(id: number): Bookmark {
  return {
    id: getGuid(),
    name: `Bookmark ${id}`,
    url: `https://example.com/page-${id}`,
    useFavicon: false,
  }
}

export function reducer(
  state: BookmarkState = initialState,
  action: AppAction<ActionTypes>
): BookmarkState {
  switch (action.type) {
    case ActionTypes.DebugClearBookmarks: {
      return {
        ...state,
        bookmarks: {},
      }
    }
    case ActionTypes.DebugAddBookmarks: {
      return {
        ...state,
        bookmarks: {
          ...state.bookmarks,
          ...action.payload,
        },
      }
    }
    case ActionTypes.AddBookmark: {
      return {
        ...state,
        bookmarks: {
          ...state.bookmarks,
          [action.payload.id]: action.payload,
        },
      }
    }
    case ActionTypes.RemoveBookmark: {
      return {
        ...state,
        bookmarks: omitKey(action.payload, state.bookmarks),
      }
    }
    case ActionTypes.RestoreBookmarks: {
      return {
        ...state,
        bookmarks: action.payload,
      }
    }
    default:
      return state
  }
}

export const BookmarkContext = createContext<BookmarkContext>(
  {} as BookmarkContext
)

export const BookmarkProvider: React.FC = ({ children }) => {
  const { state, dispatch } = usePersistedReducer(
    reducer,
    { bookmarks: {} },
    LocalStorageKeys.Bookmarks
  )

  const addBookmark = (bookmark: Bookmark) => {
    dispatch({
      type: ActionTypes.AddBookmark,
      payload: bookmark,
    })
  }

  const debugAddBookmarks = (numberOfBookmarks: number) => {
    let i
    let bookmarks = {}
    for (i = 0; i < numberOfBookmarks; i++) {
      const mockBookmark = createMockBookmark(i)
      bookmarks = {
        ...bookmarks,
        [mockBookmark.id]: mockBookmark,
      }
    }
    dispatch({
      type: ActionTypes.DebugAddBookmarks,
      payload: bookmarks,
    })
  }

  const restoreBookmarks = (state: BookmarkState) => {
    dispatch({
      type: ActionTypes.RestoreBookmarks,
      payload: state,
    })
  }

  const debugClearBookmarks = () => {
    dispatch({ type: ActionTypes.DebugClearBookmarks })
  }

  const removeBookmark = (id: string) => {
    dispatch({
      type: ActionTypes.RemoveBookmark,
      payload: id,
    })
  }

  return (
    <BookmarkContext.Provider
      value={{
        state,
        addBookmark,
        removeBookmark,
        debugAddBookmarks,
        debugClearBookmarks,
        restoreBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}
