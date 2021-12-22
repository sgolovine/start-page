import classNames from "classnames";

const REFERENCE_DOCUMENT_URL =
  "https://github.com/simple-icons/simple-icons/blob/HEAD/slugs.md";

interface Props {
  bookmarkNameValue: string;
  bookmarkURLValue: string;
  bookmarkSiSlugValue: string;
  bookmarkUseFaviconValue: boolean;

  onBookmarkNameChange: (newName: string) => void;
  onBookmarkURLChange: (newURL: string) => void;
  onBookmarkSiSlugChange: (newSiSlug: string) => void;
  onBookmarkUseFaviconChange: (newUseFavicon: boolean) => void;
  onSubmit: () => void;
}

export const AddBookmarkForm: React.FC<Props> = ({
  bookmarkNameValue,
  bookmarkURLValue,
  bookmarkSiSlugValue,
  bookmarkUseFaviconValue,
  onBookmarkNameChange,
  onBookmarkURLChange,
  onBookmarkSiSlugChange,
  onBookmarkUseFaviconChange,
  onSubmit,
}) => {
  const containerStyle = classNames(["flex", "flex-col", "my-2"]);
  const labelStyle = classNames(["mx-1", "text-sm", "italic", "font-bold"]);
  const inputStyle = classNames(["my-2", "mx-1", "p-2", "border"]);
  const helperLabelStyle = classNames(["mx-2", "text-xs", "italic"]);

  return (
    <div className="flex flex-col max-w-lg border">
      <h2 className="mx-1 text-lg font-bold">Add Bookmark</h2>
      {/* Bookmark Name */}
      <div className={containerStyle}>
        <label className={labelStyle}>Bookmark Name (Required)</label>
        <input
          value={bookmarkNameValue}
          onChange={(e) => onBookmarkNameChange(e.target.value)}
          className={inputStyle}
          placeholder="Bookmark Name"
        />
      </div>

      {/* Bookmark URL */}
      <div className={containerStyle}>
        <label className={labelStyle}>Bookmark URL (Required)</label>
        <input
          value={bookmarkURLValue}
          onChange={(e) => onBookmarkURLChange(e.target.value)}
          className={inputStyle}
          placeholder="Bookmark URL"
        />
      </div>

      {/* Simple Icons Slug */}
      <div className={containerStyle}>
        <label className={labelStyle}>Simple Icon Slug (Optional)</label>
        <input
          value={bookmarkSiSlugValue}
          onChange={(e) => onBookmarkSiSlugChange(e.target.value)}
          className={inputStyle}
          placeholder="Simple Icons Slug"
        />
        <p className={helperLabelStyle}>
          Refer to this{" "}
          <a
            className="text-blue-600 hover:underline"
            href={REFERENCE_DOCUMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            guide
          </a>{" "}
          for all slugs
        </p>
      </div>

      {/* Use Favicons */}
      <div className={containerStyle}>
        <label className="mx-1 font-bold">
          Use Favicon
          <input
            checked={bookmarkUseFaviconValue}
            onChange={(e) => onBookmarkUseFaviconChange(e.target.checked)}
            className="ml-2"
            type="checkbox"
          />
        </label>
        <p className={helperLabelStyle}>
          Valid slugs will be shown before the favicon
        </p>
      </div>

      {/* Submit Button */}
      <div>
        <button
          onClick={onSubmit}
          className="border p-4 font-bold mx-1 my-2 bg-green-500 text-white"
        >
          Add Bookmark
        </button>
      </div>
    </div>
  );
};
