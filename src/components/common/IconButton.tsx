import classNames from "classnames"
import { ReactNode, RefObject } from "react"

interface Props {
  Icon: ReactNode
  onClick: () => void
  active: boolean
  leftMargin?: boolean
  rightMargin?: boolean
}

export const IconButton: React.FC<Props> = ({
  Icon,
  onClick,
  active,
  leftMargin = false,
  rightMargin = false,
}) => {
  const buttonClasses = classNames(["p-2", "rounded-full"], {
    // "border-transparent": !active,
    "ring-2 ring-blue-500": active,
    "mr-4": rightMargin,
    "ml-4": leftMargin,
  })

  return (
    <button className={buttonClasses} type="button" onClick={onClick}>
      {Icon}
    </button>
  )
}
