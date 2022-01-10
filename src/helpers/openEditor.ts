export function openEditor(bookmarkId?: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/add"
      : "https://startpage.sunny.gg/add";

  const windowOptions =
    "resizable=no,scrollbars=no,status=no,location=no,toolbar=no,menubar=no,height=500,width=500";

  const editorOptions = bookmarkId ? "?bookmarkId=" + bookmarkId : "";

  const option = `${baseUrl},${editorOptions}`;
}
