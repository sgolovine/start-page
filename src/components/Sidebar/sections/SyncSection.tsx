import { useContext, useState } from "react"
import { BookmarkContext } from "../../../context/BookmarkContext"
import { Section } from "../SidebarComponents"

export const SyncSection = () => {
  const bookmarkContext = useContext(BookmarkContext)

  const [backupState, setBackupState] = useState<string>("")

  const handleSaveBookmarks = () => {
    const bookmarks = bookmarkContext.state.bookmarks
    var anchor = document.createElement("a")
    var file = new Blob([JSON.stringify(bookmarks, null, 2)], {
      type: "application/json",
    })
    anchor.href = URL.createObjectURL(file)
    anchor.download = "bookmarks.json"
    anchor.click()
  }

  const handleRestoreBookmarks = () => {
    try {
      const parsedBookmarks = JSON.parse(backupState)
      bookmarkContext.restoreBookmarks(parsedBookmarks)
    } catch (e: any) {
      alert("Error restoring bookmarks")
      console.error(e)
    }
  }

  return (
    <Section title="Sync">
      <p className="font-bold text-xl">Save Bookmarks</p>
      <p className="text-sm py-2">
        Click the button to download your bookmarks to a JSON file
      </p>
      <button
        onClick={handleSaveBookmarks}
        className="border px-4 py-2 bg-blue-500 text-white rounded shadow active:bg-blue-600"
      >
        Save Bookmarks
      </button>
      <div className="my-2">
        <p className="font-bold text-xl">Load Bookmarks</p>
        <p className="text-sm py-2">
          Paste the contents of your JSON file here to restore your bookmarks
        </p>
        <textarea
          value={backupState}
          onChange={e => setBackupState(e.target.value)}
          className="border bg:white dark:bg-zinc-700 text-black dark:text-white"
          placeholder="Paste your bookmark data here to load it"
          rows={10}
        />
      </div>
      <button
        onClick={handleRestoreBookmarks}
        className="border px-4 py-2 bg-blue-500 text-white rounded shadow active:bg-blue-600"
      >
        Load Bookmarks
      </button>
    </Section>
  )
}
