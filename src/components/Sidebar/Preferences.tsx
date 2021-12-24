import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const Preferences = () => {
  const themeContext = useContext(ThemeContext);

  const renderThemeToggle = () => (
    <div className="h-12 flex flex-row items-center justify-between px-4">
      <p className="font-semibold text-lg text-zinc-900 dark:text-white">
        Dark Theme
      </p>
      <input
        className="h-5 w-5"
        type="checkbox"
        checked={themeContext.theme === "dark"}
        onChange={() =>
          themeContext.setTheme(
            themeContext.theme === "dark" ? "light" : "dark"
          )
        }
      />
    </div>
  );

  return (
    <div>
      <h2 className="mx-1 text-xl font-bold text-zinc-900 dark:text-white">
        Preferences
      </h2>
      <div className="mt-4">{renderThemeToggle()}</div>
    </div>
  );
};
