import 'zarm/dist/zarm.min.css';
import MyRouter from './pages/Router';
import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <MyRouter />
      </Router>
    </div >
  );
}

export default App;
