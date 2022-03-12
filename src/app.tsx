import * as React from "react";
import * as ReactDOM from "react-dom";
import { Header } from "./components/Header/Header"
import { Main } from "./components/Main/Main";

const root = document.getElementById("react-app");

ReactDOM.render(
  <div>
      <Header/>
      <Main/>
  </div>,
  root
);
