import React, { useState } from "react"
import { BookmarkEditor } from "../BookmarkEditor"
import { GearIcon } from "../icons/GearIcon"

interface Props {
  onSidebarButtonClick: () => void
}

export const Header: React.FC<Props> = ({ onSidebarButtonClick }) => {
  const [webSearchValue, setWebSearchValue] = useState<string>("")

  // This controls searching, detects when "Enter" is pressed
  const handleWebSearch = () => {
    window.location.assign(
      `https://duckduckgo.com/?q=${encodeURI(webSearchValue ?? "")}`
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-16 px-4 lg:px-6 bg-white dark:bg-zinc-800 shadow-sm flex flex-row items-center justify-between">
      <div className="flex-grow flex flex-row items-center mr-4">
        <input
          className="flex-grow border shadow rounded-lg px-4 py-2 bg-white dark:bg-zinc-900 dark:border-gray-900 text-gray-800 dark:text-gray-50"
          placeholder="Search the Web (Press <Enter> to Search)"
          value={webSearchValue}
          onChange={e => setWebSearchValue(e.target.value)}
          onKeyPress={e => {
            e.key === "Enter" && handleWebSearch()
          }}
        />
      </div>
      <BookmarkEditor />
      <button onClick={() => onSidebarButtonClick()}>
        <GearIcon />
      </button>
    </div>
  )
}
