import { useContext } from "react"
import { BookmarkContext } from "../../../context/BookmarkContext"
import { Button, Section } from "../SidebarComponents"

export const Devtools = () => {
  const bookmarkContext = useContext(BookmarkContext)

  const handleGenerateMockBookmarks = () => {
    bookmarkContext.debugAddBookmarks(10)
    alert("10 Random Bookmarks Generated")
  }

  const handleClearBookmarks = () => {
    bookmarkContext.debugClearBookmarks()
    alert("Cleared all bookmarks")
  }

  return (
    <Section title="Developer Tools">
      <Button
        title="Generate Mock Bookmarks"
        onClick={handleGenerateMockBookmarks}
      />
      <Button title="Clear all Bookmarks" onClick={handleClearBookmarks} />
    </Section>
  )
}
