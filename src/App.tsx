import React from 'react';
import './App.css';
import InfectionTable from "./components/InfectionTable";
import {GetInfections} from "./infections";

function App() {
  return (
    <div className="App">`
        <InfectionTable entries={GetInfections()} />
    </div>
  );
}

export default App;
