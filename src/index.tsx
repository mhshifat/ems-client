import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Providers from "./providers";
import Routes from "./routes";

const root = (
  <BrowserRouter>
    <Providers>
      <Routes />
    </Providers>
  </BrowserRouter>
);

ReactDOM.render(root, document.getElementById("root"));
