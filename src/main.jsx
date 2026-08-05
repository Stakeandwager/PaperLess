import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// global styles — imported ONCE here, available everywhere
import "./index.css";
import "./styles/layout.css";
import "./styles/forms.css";
import "./styles/buttons.css";
import "./styles/table.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);