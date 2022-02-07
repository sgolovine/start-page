import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { Bookmark } from "../../model/Bookmark"
import { EditIcon } from "../icons/EditIcon"
import { BookmarkEditorView } from "./BookmarkEditorView"

interface Props {
  editMode: boolean
  visible: boolean
  form: Partial<Bookmark>
  nameError: boolean
  urlError: boolean
  setVisible: (newVisible: boolean) => void
  submitForm: () => void
  clearForm: () => void
  setName: (value: string) => void
  setUrl: (value: string) => void
  setSiSlug: (value: string) => void
  setUseFavicon: (value: boolean) => void
  unsetEditMode: () => void
}

export const BookmarkEditor: React.FC<Props> = ({
  editMode,
  visible,
  setVisible,
  form,
  nameError,
  urlError,
  submitForm,
  clearForm,
  setName,
  setUrl,
  setSiSlug,
  setUseFavicon,
  unsetEditMode,
}) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const visibilityClasses = classNames(["absolute"], {
    hidden: !visible,
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
    clearForm()
    unsetEditMode()
    setVisible(false)
  }

  const handleSubmit = () => {
    submitForm()
    clearForm()
    unsetEditMode()
    setVisible(false)
  }

  const toggle = () => {
    if (visible) {
      clearForm()
      unsetEditMode()
      setVisible(false)
      return
    }
    setVisible(true)
  }

  const buttonClasses = classNames(["p-2", "mr-4", "rounded-full", "border"], {
    "border-transparent": !visible,
    "border-white": visible,
  })

  return (
    <>
      <button ref={buttonRef} className={buttonClasses} onClick={toggle}>
        <EditIcon />
      </button>
      <div
        style={{ top: position.top, left: position.left }}
        className={visibilityClasses}
      >
        <div className="w-80 p-4 border border-gray-200 dark:border-gray-600 bg-slate-50 dark:bg-zinc-800 rounded-lg shadow-lg">
          <BookmarkEditorView
            editMode={editMode}
            name={{
              value: form.name ?? "",
              onChange: setName,
              error: nameError,
            }}
            url={{
              value: form.url ?? "",
              onChange: setUrl,
              error: urlError,
            }}
            siSlug={{
              value: form.simpleIconsSlug ?? "",
              onChange: setSiSlug,
            }}
            useFavicon={{
              value: form.useFavicon ?? false,
              onChange: setUseFavicon,
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </>
  )
}
