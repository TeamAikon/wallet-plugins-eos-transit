import React from "react";
import "./App.css";
import { Auth } from "./context";
import { Router } from "./Router";

function App() {
  return (
    <Auth>
      <Router />
    </Auth>
  );
}

export default App;
