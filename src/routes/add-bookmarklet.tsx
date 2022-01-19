import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { useBookmarkForm } from "../hooks/useBookmarkForm";

const containerClasses = classNames(["flex", "flex-col", "my-2"]);

const labelClasses = classNames([
  "text-gray-900",
  "dark:text-gray-50",
  "text-sm",
  "italic",
  "font-bold",
]);

const inputClasses = classNames([
  "border",
  "dark:border-gray-900",
  "bg-white",
  "dark:bg-zinc-900",
  "text-gray-800",
  "dark:text-gray-50",
  "p-2",
  "rounded",
  "my-1",
  "text-white",
]);

export const AddBookmarkletRoute: React.FC = ({}) => {
  const { state } = useContext(BookmarkContext);

  const urlSearchParams: { title?: string; url?: string; bookmarkId?: string } =
    Object.fromEntries(new URLSearchParams(window.location.search).entries());

  const {
    form,
    setName,
    setUrl,
    setSiSlug,
    setUseFavicon,
    setForm,
    submitForm,
    clearForm,
  } = useBookmarkForm();

  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  const editMode = !!bookmarkId;

  useEffect(() => {
    if (urlSearchParams.bookmarkId) {
      setBookmarkId(urlSearchParams.bookmarkId);
    }
    if (urlSearchParams.title) {
      setName(urlSearchParams.title);
    }
    if (urlSearchParams.url) {
      setName(urlSearchParams.url);
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
        setForm(bookmark);
      }
    }
  }, [editMode, bookmarkId]);

  const handleCancel = () => {
    clearForm();
    window.close();
  };

  const handleSubmit = () => {
    const valid = submitForm();
    if (valid) {
      clearForm();
      window.close();
    }
  };

  return (
    <div className="px-2">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50 py-4 text-center">
        {editMode ? "Edit Bookmark" : "Add Bookmark"}
      </h1>
      <hr />
      <div>
        <div className={containerClasses}>
          <label className={labelClasses}>Bookmark Name (required)</label>
          <input
            value={form.name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className={inputClasses}
          />
        </div>
        <div className={containerClasses}>
          <label className={labelClasses}>Bookmark URL (required)</label>
          <input
            value={form.url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            className={inputClasses}
          />
        </div>
        <div className={containerClasses}>
          <label className={labelClasses}>Simple Icon Slug (optional)</label>
          <input
            value={form.simpleIconsSlug}
            onChange={(e) => setSiSlug(e.target.value)}
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
              checked={form.useFavicon}
              onChange={(e) => setUseFavicon(e.target.checked)}
            />
          </label>
        </div>
      </div>
      <p className="text-sm dark:text-white">
        Please refresh your browser to see changes.
      </p>
      <div className="flex flex-row">
        <button
          onClick={handleSubmit}
          className="text-green-400 font-bold p-2 my-4"
        >
          {editMode ? "Save Changes" : "Add Bookmark"}
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
