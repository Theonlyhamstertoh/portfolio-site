import React from "react";
import { createRoot } from "react-dom/client";
import "./scss/index.scss";
import App from "./App";
import { Canvas } from "@react-three/fiber";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
