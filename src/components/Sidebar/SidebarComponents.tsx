import React, { ReactNode } from "react"

interface SectionProps {
  title: string
  children: ReactNode
}

interface CBProps {
  label: string
  checked: boolean
  onChange: () => void
}

interface BtnProps {
  title: string
  onClick: () => void
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold dark:text-gray-400 text-zinc-800">
        {title}
      </h2>
      <div className="text-lg px-2 pt-4 dark:text-white text-zinc-800">
        {children}
      </div>
    </div>
  )
}

export const CheckboxField: React.FC<CBProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <p className="font-semibold text-lg text-zinc-900 dark:text-gray-200">
        {label}
      </p>
      <input
        className="h-5 w-5"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  )
}

export const Button: React.FC<BtnProps> = ({ title, onClick }) => {
  return (
    <button
      className="border border-blue-500 rounded w-48 h-10 my-1 hover:ring-2 ring-blue-500"
      type="button"
      onClick={onClick}
    >
      <p className="text-sm">{title}</p>
    </button>
  )
}

export const Seperator = () => (
  <hr className="border-gray-300 dark:border-zinc-600 my-4" />
)
