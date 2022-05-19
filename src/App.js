/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Account from "./component/Account";
import Chart from "./component/Chart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Account />} />
        <Route
          exact
          path="/mychart"
          element={<Chart width={600} height={400} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
