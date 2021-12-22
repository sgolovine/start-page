import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Router } from "../routes";
import { BookmarkProvider } from "../services/BookmarkContext";
import "./main.css";

ReactDOM.render(
  <React.StrictMode>
    <BookmarkProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </BookmarkProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
