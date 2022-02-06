import classNames from "classnames"
import { Bookmark } from "../../model/Bookmark"
import { Checkbox, Input } from "../BookmarkEditor/EditorComponents"

const REFERENCE_DOCUMENT_URL =
  "https://github.com/simple-icons/simple-icons/blob/HEAD/slugs.md"

interface Props {
  editMode?: boolean
  bookmarkId?: string
  bookmarkNameValue: string
  bookmarkURLValue: string
  bookmarkSiSlugValue: string
  bookmarkUseFaviconValue: boolean
  formNameError: boolean
  formUrlError: boolean
  onBookmarkNameChange: (newName: string) => void
  onBookmarkURLChange: (newURL: string) => void
  onBookmarkSiSlugChange: (newSiSlug: string) => void
  onBookmarkUseFaviconChange: (newUseFavicon: boolean) => void
  onSubmit: () => void
  onEdit: () => void
  onDelete: (bookmarkId: string) => void
}

export const AddBookmarkForm: React.FC<Props> = ({
  editMode,
  bookmarkId,
  bookmarkNameValue,
  bookmarkURLValue,
  bookmarkSiSlugValue,
  bookmarkUseFaviconValue,
  formNameError,
  formUrlError,
  onBookmarkNameChange,
  onBookmarkURLChange,
  onBookmarkSiSlugChange,
  onBookmarkUseFaviconChange,
  onSubmit,
  onEdit,
  onDelete,
}) => {
  const headerText = editMode ? "Edit Bookmark" : "Add Bookmark"
  const submitText = editMode ? "Save Changes" : "Add Bookmark"

  return (
    <div className="flex flex-col">
      <h2 className="mx-1 text-xl font-bold text-zinc-900 dark:text-white">
        {headerText}
      </h2>

      <Input
        isRequired
        label="Bookmark Name"
        value={bookmarkNameValue}
        onChange={newText => onBookmarkNameChange(newText)}
        error={formNameError}
        errorMessage="Please enter a name"
      />

      <Input
        isRequired
        label="Bookmark URL"
        value={bookmarkURLValue}
        onChange={newText => onBookmarkURLChange(newText)}
        error={formUrlError}
        errorMessage="Please enter a valid URL"
      />

      <Input
        label="Simple Icon Slug"
        value={bookmarkSiSlugValue}
        onChange={newText => onBookmarkSiSlugChange(newText)}
      />

      <Checkbox
        label="Use Favicon"
        value={bookmarkUseFaviconValue}
        onChange={newValue => onBookmarkUseFaviconChange(newValue)}
      />

      {/* Submit Button */}
      <div>
        {editMode && bookmarkId && (
          <button
            onClick={() => onDelete(bookmarkId)}
            className="p-1 font-bold mx-1 my-2 text-red-600 dark:text-red-400"
          >
            Delete Bookmark
          </button>
        )}
        <button
          onClick={editMode ? onEdit : onSubmit}
          className="p-1 font-bold mx-1 my-2 text-green-700 dark:text-green-400"
        >
          {submitText}
        </button>
      </div>
    </div>
  )
}
