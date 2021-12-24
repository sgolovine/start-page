export function formatURL(urlString: string): string {
  try {
    const url = new URL(urlString);
    return url.host;
  } catch (e) {
    return urlString;
  }
}
