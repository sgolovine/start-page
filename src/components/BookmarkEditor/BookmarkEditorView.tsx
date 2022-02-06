import classNames from "classnames"

interface FormInputProps {
  label: string
  isRequired?: boolean
  value?: string
  onChange?: (newText: string) => void
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
}) => {
  return (
    <div className="pb-2">
      <label className={labelStyle}>
        {isRequired ? `${label} (required)` : label}
      </label>
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

export const BookmarkEditorView = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="pb-2 text-xl font-bold text-zinc-900 dark:text-white">
        Create Bookmark
      </h2>
      <div className="grow">
        <Input label="Bookmark Name" isRequired />
        <Input label="Bookmark URL" isRequired />
        <Input label="Simple Icon Slug" />
        <div className="pb-2">
          <div className="flex flex-row items-center justify-between">
            <p className="font-semibold text-lg text-zinc-900 dark:text-white">
              Use Favicon
            </p>
            <input
              className="h-5 w-5"
              type="checkbox"
              checked={false}
              onChange={() => null}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-evenly mt-4">
        <button className="border-2 border-green-500 text-zinc-900 dark:text-white font-bold w-32 py-2 rounded-sm">
          Create
        </button>
        <button className="border-2 border-red-500 text-zinc-900 dark:text-white font-bold w-32 py-2 rounded-sm">
          Cancel
        </button>
      </div>
    </div>
  )
}
