import { useContext, useState } from "react";
import { BookmarkCard } from "./components/BookmarkCard/BookmarkCard";
import { AddBookmarkForm } from "./components/Sidebar/AddBookmarkForm";
import { useBookmarkForm } from "./hooks/useBookmarkForm";
import { FormModal } from "./components/Sidebar/FormModal";
import { GearIcon } from "./components/icons/GearIcon";
import { Bookmark } from "./model/Bookmark";
import { BookmarkContext } from "./context/BookmarkContext";
import { AllBookmarksForm } from "./components/Sidebar/AllBookmarksForm";

export const MainView = () => {
  const bookmarkContext = useContext(BookmarkContext);
  const isEmpty = Object.keys(bookmarkContext.state.bookmarks).length === 0;
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false);
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
  } = useBookmarkForm();

  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEdit = (bookmark: Bookmark) => {
    setEditMode(true);
    setForm(bookmark);
    setFormModalVisible(true);
  };

  const handleEditSubmit = () => {
    const valid = submitForm();
    if (valid) {
      setEditMode(false);
      setFormModalVisible(false);
    }
  };

  const handleSubmit = () => {
    const valid = submitForm();
    if (valid) {
      handleClose();
    }
  };

  const handleClose = () => {
    setFormModalVisible(false);
    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    bookmarkContext.removeBookmark(id);
    setEditMode(false);
    setFormModalVisible(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="fixed top-0 right-0 p-4">
        <button onClick={() => setFormModalVisible(true)}>
          <GearIcon />
        </button>
      </div>
      <div className="p-4">
        <div className="flex flex-row flex-wrap max-w-5xl">
          {isEmpty ? (
            <p>No Bookmarks</p>
          ) : (
            Object.values(bookmarkContext.state.bookmarks).map((item) => {
              return (
                <div className="m-2" key={item.id}>
                  <BookmarkCard
                    name={item.name}
                    url={item.url}
                    siSlug={item.simpleIconsSlug}
                    useFavicon={item.useFavicon}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      <FormModal visible={formModalVisible} onClose={handleClose}>
        <AddBookmarkForm
          editMode={editMode}
          bookmarkId={form.id}
          bookmarkNameValue={form.name ?? ""}
          bookmarkURLValue={form.url ?? ""}
          bookmarkSiSlugValue={form.simpleIconsSlug ?? ""}
          bookmarkUseFaviconValue={form.useFavicon ?? false}
          onBookmarkNameChange={setName}
          onBookmarkURLChange={setUrl}
          onBookmarkSiSlugChange={setSiSlug}
          onBookmarkUseFaviconChange={setUseFavicon}
          onSubmit={handleSubmit}
          onEdit={handleEditSubmit}
          onDelete={handleDelete}
          formNameError={formNameError}
          formUrlError={formUrlError}
        />

        {Object.keys(bookmarkContext.state.bookmarks).length > 0 && (
          <>
            <hr className="my-4" />
            <AllBookmarksForm
              bookmarks={bookmarkContext.state.bookmarks}
              onEditBookmark={handleEdit}
            />
          </>
        )}
      </FormModal>
    </div>
  );
};
