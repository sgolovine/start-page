import React from "react";
import ReactDOM from "react-dom";
import { BookmarkProvider } from "./context/BookmarkContext";
import "./bootstrap-tailwind.css";
import { AppContainer } from "./AppContainer";
import { ThemeProvider } from "./context/ThemeContext";
import { registerSW } from "virtual:pwa-register";
import { ThemeHelmet } from "./components/Helmet/ThemeHelmet";
import { Router } from "./Router";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeHelmet />
      <AppContainer>
        <BookmarkProvider>
          <Router />
        </BookmarkProvider>
      </AppContainer>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

const intervalMS = 60 * 60 * 1000;

registerSW({
  onRegistered(r: any) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
});
