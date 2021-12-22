import { Routes, Route } from "react-router-dom";
import { PreferencesRoute } from "./preferences";
import { MainRoute } from "./main";

export const Router = () => {
  return (
    <Routes>
      <Route path="/preferences" element={<PreferencesRoute />} />
      <Route path="/" element={<MainRoute />} />
    </Routes>
  );
};
