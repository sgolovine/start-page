import { useContext, useMemo, useState } from "react";
import { BookmarkCard } from "../components/BookmarkCard";
import { FormModal } from "../components/Sidebar/FormModal";
import { Bookmark } from "../model/Bookmark";
import { BookmarkContext } from "../context/BookmarkContext";
import { AllBookmarksForm } from "../components/Sidebar/AllBookmarksForm";
import { Header } from "../components/Header/Header";
import { Preferences } from "../components/Sidebar/Preferences";
import { openEditor } from "../helpers/openEditor";

export const AppRoute = () => {
  const bookmarkContext = useContext(BookmarkContext);
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false);

  const handleEdit = (bookmark: Bookmark) => {
    openEditor(bookmark.id);
  };

  const handleClose = () => {
    setFormModalVisible(false);
  };

  const renderBookmarks = () =>
    useMemo(() => {
      const isEmpty = Object.keys(bookmarkContext.state.bookmarks).length === 0;
      if (isEmpty) {
        return <p className="text-zinc-900 dark:text-white">No Bookmarks</p>;
      }
      return (
        <>
          {Object.values(bookmarkContext.state.bookmarks).map((item) => {
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
          })}
        </>
      );
    }, [bookmarkContext.state]);

  return (
    <>
      <Header onSidebarButtonClick={() => setFormModalVisible(true)} />
      <div className="mt-16 p-4">
        <div className="flex flex-row flex-wrap justify-evenly sm:justify-start max-w-5xl">
          {renderBookmarks()}
        </div>
      </div>

      <FormModal visible={formModalVisible} onClose={handleClose}>
        {Object.keys(bookmarkContext.state.bookmarks).length > 0 && (
          <>
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
