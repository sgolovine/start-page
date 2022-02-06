import classNames from "classnames"

interface FormInputProps {
  label: string
  isRequired?: boolean
  value?: string
  onChange?: (newText: string) => void
  error?: boolean
  errorMessage?: string
}

interface FormCheckboxProps {
  label: string
  value: boolean
  onChange: (newValue: boolean) => void
}

const labelStyle = classNames([
  "text-sm",
  "italic",
  "font-bold",
  "text-zinc-900",
  "dark:text-gray-100",
])

const inputStyle = classNames([
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
])

export const Input: React.FC<FormInputProps> = ({
  label,
  isRequired,
  value,
  onChange,
  error,
  errorMessage,
}) => {
  return (
    <div className="pb-2">
      <label className={labelStyle}>
        {isRequired ? `${label} (required)` : label}
      </label>
      {error && (
        <p className="text-sm font-bold text-red-500">{errorMessage ?? ""}</p>
      )}
      <input
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        className={inputStyle}
        type="text"
        placeholder="Bookmark Name"
      />
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
