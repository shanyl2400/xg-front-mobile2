import 'zarm/dist/zarm.min.css';
import MyRouter from './pages/Router';
import { ConfigProvider } from 'zarm';
import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <ConfigProvider primaryColor="#c9000b">
        <Router>
          <MyRouter />
        </Router>
      </ConfigProvider>
    </div >
  );
}

export default App;
