import classNames from "classnames";
import { GlobeIcon } from "../icons/GlobeIcon";

interface Props {
  type: "desktop" | "mobile";
  url: string;
  name: string;
  useFavicon?: boolean;
  siSlug?: string;
}

const baseClasses = classNames(["mx-auto", "bg-white", "rounded-full"]);

const desktopClasses = classNames(["h-16", "w-16"]);

const mobileClasses = classNames(["h-12", "w-12"]);

export const BkIcon: React.FC<Props> = ({
  type,
  url,
  useFavicon,
  siSlug,
  name,
}) => {
  const iconClasses = classNames(baseClasses, {
    desktopClasses: type === "desktop",
    mobileClasses: type === "mobile",
  });

  if (useFavicon) {
    const faviconUrl = `${url}/favicon.ico`;
    return <img className={iconClasses} src={faviconUrl} alt={name} />;
  }
  if (siSlug) {
    return (
      <img
        className={iconClasses}
        height="32"
        width="32"
        src={`https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/${siSlug}.svg`}
      />
    );
  }
  return (
    <div className={iconClasses}>
      <GlobeIcon />
    </div>
  );
};
