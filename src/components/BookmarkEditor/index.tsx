import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { EditIcon } from "../icons/EditIcon"
import { BookmarkEditorView } from "./BookmarkEditorView"

export const BookmarkEditor = () => {
  const [bookmarkFormVisible, setBookmarkFormVisible] = useState<boolean>(false)
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const visibilityClasses = classNames(["absolute", "top-5", "right-5"], {
    hidden: !bookmarkFormVisible,
  })

  useEffect(() => {
    function handleResize() {
      if (
        buttonRef &&
        buttonRef.current &&
        buttonRef.current.offsetTop &&
        buttonRef.current.offsetLeft
      ) {
        setPosition({
          top: buttonRef.current.offsetTop + 50,
          left: buttonRef.current.offsetLeft - 300,
        })
      }
    }
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (
      buttonRef.current &&
      buttonRef.current.offsetTop &&
      buttonRef.current.offsetLeft
    ) {
      setPosition({
        top: buttonRef.current.offsetTop + 50,
        left: buttonRef.current.offsetLeft - 300,
      })
    }
  }, [buttonRef])

  return (
    <>
      <button
        ref={buttonRef}
        className="p-2 mr-4 rounded-full"
        onClick={() => setBookmarkFormVisible(prev => !prev)}
      >
        <EditIcon />
      </button>
      <div
        style={{ top: position.top, left: position.left }}
        className={visibilityClasses}
      >
        <div className="w-80 p-4 border border-gray-200 dark:border-gray-600 bg-slate-50 dark:bg-zinc-800 rounded-lg shadow-lg">
          <BookmarkEditorView />
        </div>
      </div>
    </>
  )
}
