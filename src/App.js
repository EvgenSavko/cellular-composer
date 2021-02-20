import React from "react";
import "./App.scss";

import Btn from "@Components/Btn/Btn";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cellular Composer</h1>
        <Btn title={"Test"} number={123} />
      </header>
    </div>
  );
}

export default App;
