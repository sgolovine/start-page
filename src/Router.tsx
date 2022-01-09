import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddBookmarkletRoute } from "./routes/add-bookmarklet";
import { AppRoute } from "./routes/app";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppRoute />} />
        <Route path="/add" element={<AddBookmarkletRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
