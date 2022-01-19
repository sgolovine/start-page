import { useContext, useState } from "react";
import { Bookmark } from "../model/Bookmark";
import { BookmarkContext } from "../context/BookmarkContext";
import { getGuid } from "../helpers/getGuid";

type BookmarkFormState = Partial<Bookmark>;

const initialFormState: BookmarkFormState = {
  name: "",
  url: "",
  useFavicon: false,
};

export const useBookmarkForm = () => {
  const bookmarkContext = useContext(BookmarkContext);
  const [form, setForm] = useState<BookmarkFormState>(initialFormState);

  const [formError, setFormError] = useState<{ name: boolean; url: boolean }>({
    name: false,
    url: false,
  });

  const isFormValid = () => {
    if (form.name && form.url) {
      return true;
    }
    return false;
  };

  const setName = (name: string) => {
    setFormError((prevFormError) => ({ ...prevFormError, name: false }));
    setForm((prevForm) => ({ ...prevForm, name }));
  };

  const setUrl = (url: string) => {
    setFormError((prevFormError) => ({ ...prevFormError, url: false }));
    setForm((prevForm) => ({ ...prevForm, url }));
  };

  const setSiSlug = (siSlug: string) => {
    setForm((prevForm) => ({ ...prevForm, simpleIconsSlug: siSlug }));
  };

  const setUseFavicon = (useFavicon: boolean) => {
    setForm((prevForm) => ({ ...prevForm, useFavicon }));
  };

  const clearForm = () => {
    setForm(initialFormState);
  };

  const submitForm = () => {
    if (!form.name) {
      setFormError((prevFormError) => ({ ...prevFormError, name: true }));
      return false;
    }
    if (!form.url) {
      setFormError((prevFormError) => ({ ...prevFormError, url: true }));
      return false;
    }

    const bookmarkId = form.id || getGuid();
    const bookmark: Bookmark = {
      id: bookmarkId,
      name: form.name as string,
      url: form.url as string,
      useFavicon: form.useFavicon ?? false,
      simpleIconsSlug: form.simpleIconsSlug,
    };

    bookmarkContext.addBookmark(bookmark);
    return true;
  };

  return {
    form,
    setForm: (bookmark: Bookmark) => setForm(bookmark),
    formNameError: formError.name,
    formUrlError: formError.url,
    isFormValid,
    setName,
    setUrl,
    setSiSlug,
    setUseFavicon,
    clearForm,
    submitForm,
  };
};
