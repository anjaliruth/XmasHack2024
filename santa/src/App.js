
import "./App.css";
import { useState } from "react";
import Meter from "./Meter";

function App() {
  return (
    <div className="App">
    <div>
    <h1 className="header">
      Santa's Always Watching 👀
    </h1>
    </div>
      <div>
      <Meter/>
      </div>
    </div>
  );

}

export default App;
