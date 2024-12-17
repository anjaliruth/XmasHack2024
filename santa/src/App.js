import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Meter from "./Meter";

function App() {
  const [points, setPoints] = useState(0)
  return (
    <div className="App">
    <h1 style={{display: "flex", justifyContent: "center"}}>
      Naughty or Nice Meter
    </h1>
      <div className="meter">
      <Meter/>
      </div>
    </div>
  );

}

export default App;
