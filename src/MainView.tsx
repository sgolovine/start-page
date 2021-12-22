import { useContext, useState } from "react";
import { BookmarkCard } from "./components/BookmarkCard";
import { AddBookmarkForm, useBookmarkForm } from "./components/BookmarkForm";
import { FormModal } from "./components/BookmarkForm/FormModal";
import { GearIcon } from "./components/icons/GearIcon";
import { BookmarkContext } from "./services/BookmarkContext";

const testData = new Array(20).fill(0).map((_, i) => ({
  id: `bk-${i}`,
  name: `Bookmark ${i}`,
  url: `https://example.com/${i}`,
  siSlug: "github",
  useFavicon: false,
}));

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
  } = useBookmarkForm();

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
                />
              </div>
            ))
          )}
        </div>
      </div>

      <FormModal
        visible={formModalVisible}
        onClose={() => setFormModalVisible(false)}
      >
        <AddBookmarkForm
          bookmarkNameValue={form.name ?? ""}
          bookmarkURLValue={form.url ?? ""}
          bookmarkSiSlugValue={form.simpleIconsSlug ?? ""}
          bookmarkUseFaviconValue={form.useFavicon ?? false}
          onBookmarkNameChange={setName}
          onBookmarkURLChange={setUrl}
          onBookmarkSiSlugChange={setSiSlug}
          onBookmarkUseFaviconChange={setUseFavicon}
          onSubmit={submitForm}
          formNameError={formNameError}
          formUrlError={formUrlError}
        />
      </FormModal>
    </div>
  );
};
