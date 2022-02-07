import classNames from "classnames"
import { useEffect, useState } from "react"
import { SIMPLE_ICONS_CDN } from "../../constants/cdn"
import { Bookmark } from "../../model/Bookmark"
import { EditIcon } from "../icons/EditIcon"
import { GlobeIcon } from "../icons/GlobeIcon"

interface Props extends Bookmark {
  onEdit?: (bookmark: Bookmark) => void
}

export const BookmarkCard = ({
  simpleIconsSlug,
  name,
  url,
  useFavicon,
  onEdit,
  id,
}: Props) => {
  const [siSlugSVG, setSiSlugSVG] = useState<string | undefined>(undefined)
  const [isHovering, setIsHovering] = useState<boolean>(false)

  useEffect(() => {
    const fetchIcon = async () => {
      const res = await fetch(`${SIMPLE_ICONS_CDN}/${simpleIconsSlug}.svg`)
      if (res.status !== 404) {
        const svg = await res.text()
        setSiSlugSVG(svg)
      }
    }

    if (simpleIconsSlug) {
      try {
        fetchIcon()
      } catch {
        setSiSlugSVG(undefined)
      }
    }
  }, [simpleIconsSlug])

  const handleClick = () => window.location.assign(url)

  const renderIcon = () => {
    const faviconUrl = `${url}/favicon.ico`
    if (useFavicon) {
      return (
        <img className="h-8 w-8 md:h-12 md:w-12" src={faviconUrl} alt={name} />
      )
    }
    if (siSlugSVG) {
      return (
        <div
          className="h-8 md:h-12 w-8 md:w-12 dark:fill-white fill-blue-700"
          dangerouslySetInnerHTML={{ __html: siSlugSVG }}
        />
      )
    }
    return (
      <div className="h-8 md:h-12 w-8 md:w-12">
        <GlobeIcon />
      </div>
    )
  }

  return (
    <div
      id="bk-card"
      className="z-0 h-28 w-28 md:h-44 md:w-44 border border-neutral-700 hover:ring-2 ring-blue-500 dark:ring-green-400 active:ring-red-500 rounded-md transition-shadow duration-100 ease-linear"
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="h-16 md:h-28 rounded-t-md dark:bg-neutral-800 bg-slate-200 relative">
        <div className="absolute right-1 top-1">
          <button
            onClick={e => {
              e.stopPropagation()
              onEdit &&
                onEdit({
                  id,
                  name,
                  url,
                  useFavicon,
                  simpleIconsSlug,
                })
            }}
            className={classNames("hidden", {
              "md:block": isHovering,
            })}
          >
            <EditIcon />
          </button>
        </div>
        <div className="absolute right-10 md:right-16 top-4 md:top-8">
          {renderIcon()}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-2">
        <p className="text-center md:text-left text-sm md:text-md font-bold dark:text-slate-50 text-slate-900 truncate">
          {name}
        </p>
        <p className="hidden md:inline-block text-xs dark:text-blue-400 text-blue-700 w-full truncate">
          {url}
        </p>
      </div>
    </div>
  )
}
