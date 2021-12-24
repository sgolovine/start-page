import React from "react";
import ReactDOM from "react-dom";
import { BookmarkProvider } from "./context/BookmarkContext";
import "./bootstrap-tailwind.css";
import { MainView } from "./MainView";
import { AppContainer } from "./AppContainer";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AppContainer>
        <BookmarkProvider>
          <MainView />
        </BookmarkProvider>
      </AppContainer>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
