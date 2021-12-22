import { useContext, useState } from "react";
import { BookmarkCard } from "./components/BookmarkCard";
import { AddBookmarkForm, useBookmarkForm } from "./components/BookmarkForm";
import { FormModal } from "./components/BookmarkForm/FormModal";
import { GearIcon } from "./components/icons/GearIcon";
import { Bookmark } from "./model/Bookmark";
import { BookmarkContext } from "./services/BookmarkContext";

export const MainView = () => {
  const bookmarkContext = useContext(BookmarkContext);
  const isEmpty = bookmarkContext.bookmarks.length === 0;
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
    setEditMode(false);
    setFormModalVisible(false);
    bookmarkContext.editBookmark(form as Bookmark);
  };

  const handleSubmit = () => {
    submitForm();
    handleClose();
  };

  const handleClose = () => {
    setFormModalVisible(false);
    setEditMode(false);
  };

  return (
    <div>
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
            bookmarkContext.bookmarks.map((item) => (
              <div className="m-2" key={item.id}>
                <BookmarkCard
                  name={item.name}
                  url={item.url}
                  siSlug={item.simpleIconsSlug}
                  useFavicon={item.useFavicon}
                  onEdit={() => handleEdit(item)}
                />
              </div>
            ))
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
          onDelete={bookmarkContext.removeBookmark}
          formNameError={formNameError}
          formUrlError={formUrlError}
        />
      </FormModal>
    </div>
  );
};
