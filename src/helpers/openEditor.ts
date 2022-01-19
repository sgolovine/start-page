const EDITOR_HEIGHT = 500;
const EDITOR_WIDTH = 500;

export function openEditor(bookmarkId?: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/add"
      : "https://startpage.sunny.gg/add";

  const editorOptions = bookmarkId ? "?bookmarkId=" + bookmarkId : "";

  const url = baseUrl + editorOptions;

  const windowOptions = `resizable=no,scrollbars=no,status=no,location=no,toolbar=no,menubar=no,height=${EDITOR_HEIGHT},width=${EDITOR_WIDTH}`;

  window.open(url, "_blank", windowOptions);
}
