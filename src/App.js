import React from "react";
import "./App.css";
import Players from "./pages/Players";
import PlayerContextProvider from "./context/PlayerContextProvider";

function App() {
  return (
    <div className="">
      <PlayerContextProvider>
        <Players />
      </PlayerContextProvider>
    </div>
  );
}

export default App;
