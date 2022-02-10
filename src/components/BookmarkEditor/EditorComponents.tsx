import classNames from "classnames"
import { IconButton } from "../common/IconButton"
import { EditIcon } from "../icons/EditIcon"
import { GlobeIcon } from "../icons/GlobeIcon"

interface FormInputProps {
  label?: string
  isRequired?: boolean
  value?: string
  onChange?: (newText: string) => void
  error?: boolean
  errorMessage?: string
  showButton?: boolean
  onButtonClick?: () => void
  placeholder?: string
}

interface FormCheckboxProps {
  label: string
  value: boolean
  onChange: (newValue: boolean) => void
}

interface SearchItemProps {
  label: string
  value: string
  onSelect: (value: string) => void
}

const labelStyle = classNames([
  "text-sm",
  "italic",
  "font-bold",
  "text-zinc-900",
  "dark:text-gray-100",
])

export const Input: React.FC<FormInputProps> = ({
  label,
  isRequired,
  value,
  onChange,
  error,
  errorMessage,
  showButton,
  onButtonClick,
  placeholder,
}) => {
  const inputStyle = classNames(
    [
      "w-full",
      "my-2",
      "p-2",
      "rounded-md",
      "border",
      "dark:border-zinc-800",
      "bg-white",
      "dark:bg-zinc-700",
      "text-zinc-900",
      "dark:text-white",
    ],
    {
      "mr-2": showButton,
    }
  )

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick()
    }
  }

  return (
    <div className="pb-2">
      {label && (
        <label className={labelStyle}>
          {isRequired ? `${label} (required)` : label}
        </label>
      )}
      {error && (
        <p className="text-sm font-bold text-red-500">{errorMessage ?? ""}</p>
      )}
      <div className="flex flex-row items-center">
        <input
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          className={inputStyle}
          type="text"
          placeholder={placeholder ?? label}
        />
        {showButton && (
          <button className="h-6 w-6" onClick={handleButtonClick}>
            <GlobeIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export const Checkbox: React.FC<FormCheckboxProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="pb-2">
      <div className="flex flex-row items-center justify-between">
        <p className="font-semibold text-lg text-zinc-900 dark:text-white">
          {label}
        </p>
        <input
          checked={value}
          onChange={e => onChange(e.target.checked)}
          className="h-5 w-5"
          type="checkbox"
        />
      </div>
    </div>
  )
}

export const SearchItem: React.FC<SearchItemProps> = ({
  label,
  value,
  onSelect,
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <p className="text-zinc-800 dark:text-gray-200 font-medium">{label}</p>
      <IconButton onClick={() => onSelect(value)} Icon={<EditIcon />} />
    </div>
  )
}
