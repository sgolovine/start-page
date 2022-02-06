import classNames from "classnames"

interface FormInputProps {
  label: string
  isRequired?: boolean
  value?: string
  onChange?: (newText: string) => void
  error?: boolean
  errorMessage?: string
}

interface Props {
  headerLabel: string
  name: {
    value: string
    onChange: (newName: string) => void
    error: boolean
  }
  url: {
    value: string
    onChange: (newUrl: string) => void
    error: boolean
  }
  siSlug: {
    value: string
    onChange: (newSlug: string) => void
  }
  useFavicon: {
    value: boolean
    onChange: (newUseFavicon: boolean) => void
  }
  onSubmit: () => void
  onCancel: () => void
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

const Input: React.FC<FormInputProps> = ({
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

export const BookmarkEditorView: React.FC<Props> = ({
  headerLabel,
  name,
  url,
  siSlug,
  useFavicon,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="pb-2 text-xl font-bold text-zinc-900 dark:text-white">
        {headerLabel}
      </h2>
      <div className="grow">
        <Input
          value={name.value}
          onChange={name.onChange}
          error={name.error}
          label="Bookmark Name"
          errorMessage="Please enter a bookmark name"
          isRequired
        />
        <Input
          value={url.value}
          onChange={url.onChange}
          error={url.error}
          errorMessage="Please enter a valid URL"
          label="Bookmark URL"
          isRequired
        />
        <Input
          value={siSlug.value}
          onChange={siSlug.onChange}
          label="Simple Icon Slug"
        />
        <div className="pb-2">
          <div className="flex flex-row items-center justify-between">
            <p className="font-semibold text-lg text-zinc-900 dark:text-white">
              Use Favicon
            </p>
            <input
              checked={useFavicon.value}
              onChange={() => useFavicon.onChange(!useFavicon.value)}
              className="h-5 w-5"
              type="checkbox"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-evenly mt-4">
        <button
          onClick={onSubmit}
          className="border-2 border-green-500 text-zinc-900 dark:text-white font-bold w-32 py-2 rounded-sm"
        >
          Create
        </button>
        <button
          onClick={onCancel}
          className="border-2 border-red-500 text-zinc-900 dark:text-white font-bold w-32 py-2 rounded-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
