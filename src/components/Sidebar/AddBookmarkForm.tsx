import classNames from "classnames"
import { Checkbox, Input } from "../BookmarkEditor/EditorComponents"
import { TrashIcon } from "../icons/TrashIcon"

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
  onEdit: () => void
  onDelete: (bookmarkId: string) => void
  onCancel: () => void
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
  onEdit,
  onDelete,
  onCancel,
}) => {
  const headerText = "Edit Bookmark"
  const submitText = "Save Changes"

  return (
    <div
      className={classNames(
        {
          hidden: !editMode,
        },
        ["flex", "flex-col"]
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <h2 className="mx-1 text-xl font-bold text-zinc-900 dark:text-white">
          {headerText}
        </h2>
        {bookmarkId && (
          <button className="p-1" onClick={() => onDelete(bookmarkId)}>
            <TrashIcon className="h-6 w-6 fill-red-500" />
          </button>
        )}
      </div>

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
        {bookmarkId && (
          <button
            onClick={onCancel}
            className="p-1 font-bold mx-1 my-2 text-red-600 dark:text-red-400"
          >
            Cancel
          </button>
        )}
        <button
          onClick={onEdit}
          className="p-1 font-bold mx-1 my-2 text-green-700 dark:text-green-400"
        >
          {submitText}
        </button>
      </div>
      <hr className="my-4" />
    </div>
  )
}
