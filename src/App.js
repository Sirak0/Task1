import "./App.css";
import BidList from "./Components/BidList/BidList";
import CointsList from "./Components/CointsList/CointsList";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="sections">
        <h3>
          <Link to="/">Coints list</Link>
        </h3>
        <h3>
          <Link to="/bidlist">Bid list</Link>
        </h3>
      </div>
      <Routes>
        <Route path="/" element={<CointsList />}></Route>
        <Route path="/bidlist" element={<BidList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
