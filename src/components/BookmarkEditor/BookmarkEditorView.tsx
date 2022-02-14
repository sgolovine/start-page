import { RefObject, useEffect, useRef, useState } from "react"
import { useIconSearch } from "../../hooks/useIconSearch"
import { IconButton } from "../common/IconButton"
import { CloseIcon } from "../icons/CloseIcon"
import { Checkbox, Input, SearchItem } from "./EditorComponents"

interface Props {
  editMode: boolean
  name: {
    value: string
    onChange: (newName: string) => void
    error: boolean
  }
  url: {
    value: string
    onChange: (newUrl: string) => void
    error: boolean
  }
  siSlug: {
    value: string
    onChange: (newSlug: string) => void
  }
  useFavicon: {
    value: boolean
    onChange: (newUseFavicon: boolean) => void
  }
  onSubmit: () => void
  onCancel: () => void
}

export const BookmarkEditorView: React.FC<Props> = ({
  editMode,
  name,
  url,
  siSlug,
  useFavicon,
  onSubmit,
  onCancel,
}) => {
  const [showIconSearch, setShowIconSearch] = useState<boolean>(false)

  const { searchResults, searchValue, setSearchValue } = useIconSearch()

  if (showIconSearch) {
    return (
      <div>
        <div>
          <div className="flex flex-row items-center pb-2">
            <button className="mr-2" onClick={() => setShowIconSearch(false)}>
              <CloseIcon />
            </button>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Find Icons
            </h2>
          </div>
          <Input
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search for Icons"
          />
        </div>
        <div>
          {searchResults.map(result => {
            return (
              <SearchItem
                label="Something"
                value="something"
                onSelect={thing => console.log(thing)}
              />
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col h-full">
      <h2 className="pb-2 text-xl font-bold text-zinc-900 dark:text-white">
        {editMode ? "Edit Bookmark" : "Create Bookmark"}
      </h2>
      <div className="grow">
        <Input
          value={name.value}
          onChange={name.onChange}
          error={name.error}
          label="Bookmark Name"
          errorMessage="Please enter a bookmark name"
          isRequired
        />
        <Input
          value={url.value}
          onChange={url.onChange}
          error={url.error}
          errorMessage="Please enter a valid URL"
          label="Bookmark URL"
          isRequired
        />
        <Input
          value={siSlug.value}
          onChange={siSlug.onChange}
          label="Simple Icon Slug"
          showButton
          onButtonClick={() => setShowIconSearch(true)}
        />
        <Checkbox
          label="Use Favicon"
          value={useFavicon.value}
          onChange={newValue => useFavicon.onChange(newValue)}
        />
      </div>
      <div className="flex flex-row items-center justify-evenly mt-4">
        <button
          onClick={onSubmit}
          className="border-2 border-green-500 text-zinc-900 dark:text-white font-bold w-32 py-2 rounded-sm"
        >
          {editMode ? "Save" : "Create"}
        </button>
        <button
          onClick={onCancel}
          className="border-2 border-red-500 text-zinc-900 dark:text-white font-bold w-32 py-2 rounded-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
