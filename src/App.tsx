import React from 'react';
import './App.scss';
import InfectionTable from "./components/InfectionTable";
import {GetInfections} from "./infections";
import InfectionStats from "./components/InfectionStats";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App bp3-light">
        <Nav title={"Covid 19 Tracker"}/>
            <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <InfectionStats infections={50} deaths={10} recovered={5} title="United States Statistics" />
                </div>
                <div className="col-md">
                    <InfectionTable entries={GetInfections()} region={"Global"}/>
                    <InfectionTable entries={GetInfections()} region={"Global"}/>
                    <InfectionTable entries={GetInfections()} region={"Global"}/>
                    <InfectionTable entries={GetInfections()} region={"Global"}/>
                </div>
        </div>
    </div>
    </div>
  );
}

export default App;
