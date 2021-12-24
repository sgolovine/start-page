import { useContext, useState } from "react";
import { BookmarkCard } from "./components/BookmarkCard";
import { AddBookmarkForm } from "./components/Sidebar/AddBookmarkForm";
import { useBookmarkForm } from "./hooks/useBookmarkForm";
import { FormModal } from "./components/Sidebar/FormModal";
import { Bookmark } from "./model/Bookmark";
import { BookmarkContext } from "./context/BookmarkContext";
import { AllBookmarksForm } from "./components/Sidebar/AllBookmarksForm";
import { Header } from "./components/Header/Header";
import { Preferences } from "./components/Sidebar/Preferences";

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
    clearForm,
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
      clearForm();
    }
  };

  const handleSubmit = () => {
    const valid = submitForm();
    if (valid) {
      handleClose();
      clearForm();
    }
  };

  const handleClose = () => {
    setFormModalVisible(false);
    setEditMode(false);
    clearForm();
  };

  const handleDelete = (id: string) => {
    bookmarkContext.removeBookmark(id);
    setEditMode(false);
    setFormModalVisible(false);
  };

  return (
    <>
      <Header onSidebarButtonClick={() => setFormModalVisible(true)} />
      <div className="mt-16 p-4">
        <div className="flex flex-row flex-wrap justify-evenly sm:justify-start max-w-5xl">
          {isEmpty ? (
            <p className="text-zinc-900 dark:text-white">No Bookmarks</p>
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

        <hr className="my-4" />

        <Preferences />
      </FormModal>
    </>
  );
};
