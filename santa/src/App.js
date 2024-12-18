import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Meter from "./Meter";
//FIND a background
//write numbers on the wheel (-100, 0, 100)
//make CSS intp classes rather than inline
//listen to websocket
//make needle longer
//when points increase/decrease, make a funy entence


function App() {
  const [points, setPoints] = useState(0)
  return (
    <div className="App">
    <div>
    <h1 className="header">
      Naughty or Nice Meter
    </h1>
    </div>
      <div>
      <Meter/>
      </div>
    </div>
  );

}

export default App;
