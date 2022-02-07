import { useContext, useState } from "react"
import { useBookmarkForm } from "./hooks/useBookmarkForm"
import { FormModal } from "./components/Sidebar/FormModal"
import { Bookmark } from "./model/Bookmark"
import { BookmarkContext } from "./context/BookmarkContext"
import { Header } from "./components/Header/Header"
import { Preferences } from "./components/Sidebar/Preferences"
import { BookmarkEditor } from "./components/BookmarkEditor"
import { BookmarkCard } from "./components/BookmarkCard"

export const MainView = () => {
  const bookmarkContext = useContext(BookmarkContext)
  const isEmpty = Object.keys(bookmarkContext.state.bookmarks).length === 0

  // Sidebar
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false)

  // Bookmark Editor
  const [bookmarkEditorVisible, setBookmarkEditorVisible] =
    useState<boolean>(false)

  const [editMode, setEditMode] = useState<boolean>(false)

  const {
    form,
    setName,
    setUrl,
    setSiSlug,
    setUseFavicon,
    submitForm,
    formNameError,
    formUrlError,
    setForm,
    clearForm,
  } = useBookmarkForm()

  const handleEdit = (bookmark: Bookmark) => {
    setEditMode(true)
    setForm(bookmark)
    setBookmarkEditorVisible(true)
    // setSidebarVisible(true)
  }

  const handleEditSubmit = () => {
    const valid = submitForm()
    if (valid) {
      setEditMode(false)
      setSidebarVisible(false)
      clearForm()
    }
  }

  const handleClose = () => {
    setSidebarVisible(false)
    setEditMode(false)
    clearForm()
  }

  const handleCancel = () => {
    setEditMode(false)
    clearForm()
  }

  const handleDelete = (id: string) => {
    bookmarkContext.removeBookmark(id)
    setEditMode(false)
    setSidebarVisible(false)
  }

  const renderBookmarkEditor = () => {
    return (
      <BookmarkEditor
        editMode={editMode}
        visible={bookmarkEditorVisible}
        form={form}
        nameError={formNameError}
        urlError={formUrlError}
        setVisible={(newState: boolean) => setBookmarkEditorVisible(newState)}
        submitForm={submitForm}
        clearForm={clearForm}
        setName={setName}
        setUrl={setUrl}
        setSiSlug={setSiSlug}
        setUseFavicon={setUseFavicon}
        unsetEditMode={() => setEditMode(false)}
      />
    )
  }

  return (
    <>
      <Header
        renderBookmarkEditor={renderBookmarkEditor}
        onSidebarButtonClick={() => setSidebarVisible(prev => !prev)}
      />
      <div className="mt-16 p-4 overflow-hidden">
        <div className="flex flex-row flex-wrap justify-evenly sm:justify-start max-w-5xl">
          {isEmpty ? (
            <p className="text-zinc-900 dark:text-white">No Bookmarks</p>
          ) : (
            Object.values(bookmarkContext.state.bookmarks).map(item => {
              return (
                <div className="m-2" key={item.id}>
                  <BookmarkCard
                    id={item.id}
                    name={item.name}
                    url={item.url}
                    simpleIconsSlug={item.simpleIconsSlug}
                    useFavicon={item.useFavicon}
                    onEdit={bookmark => handleEdit(bookmark)}
                  />
                </div>
              )
            })
          )}
        </div>
      </div>

      <FormModal visible={sidebarVisible} onClose={handleClose}>
        <Preferences />
      </FormModal>
    </>
  )
}
