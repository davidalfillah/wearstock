import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import IndexRoute from "./routes/Index";
import IndexRoot from "./pages/_root/Index";
import HomePage from "./pages/_root/homePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <IndexRoute />
    </React.Fragment>
  );
}

export default App;
