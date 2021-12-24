import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Helmet } from "react-helmet";

const LIGHT_COLOR = "#fff";
const DARK_COLOR = "#27272A"; // tailwindCSS zinc-800

export const ThemeHelmet: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Helmet>
      <meta
        name="theme-color"
        content={theme === "dark" ? DARK_COLOR : LIGHT_COLOR}
      ></meta>
    </Helmet>
  );
};
