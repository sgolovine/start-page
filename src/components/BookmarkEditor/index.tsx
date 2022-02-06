import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { useBookmarkForm } from "../../hooks/useBookmarkForm"
import { EditIcon } from "../icons/EditIcon"
import { BookmarkEditorView } from "./BookmarkEditorView"

export const BookmarkEditor = () => {
  const bookmarkForm = useBookmarkForm()

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

  const handleCancel = () => {
    bookmarkForm.clearForm()
    setBookmarkFormVisible(false)
  }

  const handleSubmit = () => {
    bookmarkForm.submitForm()
    bookmarkForm.clearForm()
    setBookmarkFormVisible(false)
  }

  const buttonClasses = classNames(["p-2", "mr-4", "rounded-full", "border"], {
    "border-transparent": !bookmarkFormVisible,
    "border-white": bookmarkFormVisible,
  })

  return (
    <>
      <button
        ref={buttonRef}
        className={buttonClasses}
        onClick={() => setBookmarkFormVisible(prev => !prev)}
      >
        <EditIcon />
      </button>
      <div
        style={{ top: position.top, left: position.left }}
        className={visibilityClasses}
      >
        <div className="w-80 p-4 border border-gray-200 dark:border-gray-600 bg-slate-50 dark:bg-zinc-800 rounded-lg shadow-lg">
          <BookmarkEditorView
            headerLabel={"Create Bookmark"}
            name={{
              value: bookmarkForm.form.name ?? "",
              onChange: bookmarkForm.setName,
              error: bookmarkForm.formNameError,
            }}
            url={{
              value: bookmarkForm.form.url ?? "",
              onChange: bookmarkForm.setUrl,
              error: bookmarkForm.formUrlError,
            }}
            siSlug={{
              value: bookmarkForm.form.simpleIconsSlug ?? "",
              onChange: bookmarkForm.setSiSlug,
            }}
            useFavicon={{
              value: bookmarkForm.form.useFavicon ?? false,
              onChange: bookmarkForm.setUseFavicon,
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </>
  )
}
