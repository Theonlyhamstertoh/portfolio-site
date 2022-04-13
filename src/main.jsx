import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Canvas } from "@react-three/fiber";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Canvas camera={{ position: [0, 0, 10] }}>
      <App />
    </Canvas>
  </React.StrictMode>
);
