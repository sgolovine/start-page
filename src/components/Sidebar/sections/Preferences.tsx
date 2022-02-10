import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeContext"
import { CheckboxField, Section } from "../SidebarComponents"

export const Preferences = () => {
  const themeContext = useContext(ThemeContext)

  return (
    <Section title="Preferences">
      <CheckboxField
        label="Dark Theme"
        checked={themeContext.theme === "dark"}
        onChange={() =>
          themeContext.setTheme(
            themeContext.theme === "dark" ? "light" : "dark"
          )
        }
      />
    </Section>
  )
}
