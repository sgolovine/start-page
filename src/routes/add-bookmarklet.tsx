import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { BookmarkContext } from "../context/BookmarkContext";

const containerClasses = classNames(["flex", "flex-col", "my-2"]);

const labelClasses = classNames([
  "text-white",
  "text-sm",
  "italic",
  "font-bold",
]);

const inputClasses = classNames([
  "border",
  "border-white",
  "bg-zinc-800",
  "p-2",
  "rounded",
  "my-1",
  "text-white",
]);

export const AddBookmarkletRoute: React.FC = ({}) => {
  const { state } = useContext(BookmarkContext);
  const handleCancel = () => window.close();

  const urlSearchParams: { title?: string; url?: string; bookmarkId?: string } =
    Object.fromEntries(new URLSearchParams(window.location.search).entries());

  const [bookmarkName, setBookmarkName] = useState<string>("");
  const [bookmarkHref, setBookmarkHref] = useState<string>("");
  const [bookmarkSimpleIconSlug, setBookmarkSimpleIconSlug] =
    useState<string>("");
  const [bookmarkUseFavicon, setBookmarkUseFavicon] = useState<boolean>(false);

  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  const editMode = !!bookmarkId;

  useEffect(() => {
    if (urlSearchParams.bookmarkId) {
      setBookmarkId(urlSearchParams.bookmarkId);
    }
    if (urlSearchParams.title) {
      setBookmarkName(urlSearchParams.title);
    }
    if (urlSearchParams.url) {
      setBookmarkHref(urlSearchParams.url);
    }
  }, [urlSearchParams]);

  useEffect(() => {
    if (editMode) {
      const bookmarkIdInStore = Object.keys(state.bookmarks).find(
        (id) => id === bookmarkId
      );
      const bookmark =
        state.bookmarks[bookmarkIdInStore as keyof typeof state.bookmarks];
      if (bookmark) {
        setBookmarkName(bookmark.name);
        setBookmarkHref(bookmark.url);
        setBookmarkUseFavicon(bookmark.useFavicon);
        if (bookmark.simpleIconsSlug) {
          setBookmarkSimpleIconSlug(bookmark.simpleIconsSlug);
        }
      }
    }
  }, [editMode, bookmarkId]);

  return (
    <div className="px-2">
      <h1 className="text-3xl font-bold text-white py-4 text-center">
        {editMode ? "Edit Bookmark" : "Add Bookmark"}
      </h1>
      <hr />
      <div>
        <div className={containerClasses}>
          <label className={labelClasses}>Bookmark Name (required)</label>
          <input
            value={bookmarkName}
            onChange={(e) => setBookmarkName(e.target.value)}
            type="text"
            className={inputClasses}
          />
        </div>
        <div className={containerClasses}>
          <label className={labelClasses}>Bookmark URL (required)</label>
          <input
            value={bookmarkHref}
            onChange={(e) => setBookmarkHref(e.target.value)}
            type="text"
            className={inputClasses}
          />
        </div>
        <div className={containerClasses}>
          <label className={labelClasses}>Simple Icon Slug (optional)</label>
          <input
            value={bookmarkSimpleIconSlug}
            onChange={(e) => setBookmarkSimpleIconSlug(e.target.value)}
            type="text"
            className={inputClasses}
          />
        </div>
        <div className={containerClasses}>
          <label className={labelClasses}>
            <span className="pr-2">Use Favicon (optional)</span>
            <input
              type="checkbox"
              className={inputClasses}
              checked={bookmarkUseFavicon}
              onChange={(e) => setBookmarkUseFavicon(e.target.checked)}
            />
          </label>
        </div>
      </div>
      <div className="flex flex-row">
        <button className="text-green-400 font-bold p-2 my-4">
          Add Bookmark
        </button>
        <button
          onClick={handleCancel}
          className="text-red-400 font-bold p-2 my-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
