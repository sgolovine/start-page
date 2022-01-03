/**
 * Fetches colors for every icon in si-slugs.json
 *
 * We need to do this since we can't get the color via
 * the CDN
 */
var siSlugs = require("../si-slugs.json");
var simpleIcons = require("simple-icons");
var path = require("path");
var fs = require("fs");

const slugOutPath = path.resolve(
  process.cwd(),
  "src",
  "config",
  "si-slugs.json"
);

const colorOutPath = path.resolve(
  process.cwd(),
  "src",
  "config",
  "si-color-map.json"
);

(() => {
  const colorMap = siSlugs.iconMap.reduce((acc, item) => {
    return {
      ...acc,
      [item.slug]: `#${simpleIcons.Get(item.slug).hex}`,
    };
  }, {});

  // This just minifies the main si-slug.json config`
  const slugsJSON = JSON.stringify({ iconMap: siSlugs.iconMap });
  const colorJSON = JSON.stringify({ colorMap });

  fs.writeFileSync(slugOutPath, slugsJSON, "utf-8");
  fs.writeFileSync(colorOutPath, colorJSON, "utf-8");
})();
