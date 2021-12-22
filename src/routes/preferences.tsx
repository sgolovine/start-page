import { AddBookmarkForm } from "../components/AddBookmarkForm";
import { useBookmarkForm } from "../services/useBookmarkForm";

export const PreferencesRoute = () => {
  const { form, setName, setUrl, setSiSlug, setUseFavicon, submitForm } =
    useBookmarkForm();

  return (
    <div>
      <h1>Preferences</h1>
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
      />
    </div>
  );
};
