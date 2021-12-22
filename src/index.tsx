import React from "react";
import ReactDOM from "react-dom";
import { BookmarkProvider } from "./services/BookmarkContext";
import "./bootstrap-tailwind.css";
import { MainView } from "./MainView";

ReactDOM.render(
  <React.StrictMode>
    <BookmarkProvider>
      <MainView />
    </BookmarkProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
