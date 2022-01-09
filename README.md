# My start page

[Live Version](https://startpage.sunny.gg)

Inspired by some of the work on [/r/startpages](https://reddit.com/r/startpages), this is my implementation of a start page.

## Features

- Light / Dark theme support
- Bookmarks stored via browser local storage, no config file needed.
- [Simple Icons](https://simpleicons.org/) Support
- Mobile Support
- Search with DuckDuckGo

## Improvements

- Simple icons is a really heavy package. We need to use a CDN to deliver the icons individually
- Offline support isn't perfect, needs more work.
- Sync of some sort
- Search should be expanded to Searchx, Google, Bing, etc. This should be really easy
- Build/Lint system of some sort

## Bookmarklet

```javascript
// For development
javascript: (function () {
  open(
    `http://localhost:3000/add?title=${document.title}&url=${window.location.href}`,
    "_blank",
    "resizable=no,scrollbars=no,status=no,location=no,toolbar=no,menubar=no,height=500,width=500"
  );
})();

// For Production
javascript: (function () {
  open(
    `https://startpage.sunny.gg/add?title=${document.title}&url=${window.location.href}`,
    "_blank",
    "resizable=no,scrollbars=no,status=no,location=no,toolbar=no,menubar=no,height=500,width=500"
  );
})();
```

## License

MIT

## Contributing

Submit a PR
