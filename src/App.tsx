import React, {Component} from 'react';
import './App.scss';
import InfectionTable from "./components/InfectionTable";
import {GetInfections} from "./infections";
import InfectionStats from "./components/InfectionStats";
import Nav from "./components/Nav";

interface AppProps {

}

interface AppState {
    darkMode: boolean
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: Readonly<AppProps>) {
        super(props);
        this.state = {
            darkMode: false
        }
    }

    render() {
      let themeClass = this.state.darkMode ? "bp3-dark" : "bp3-light";
      return (
          <div className={`App ${themeClass}`}>
              <Nav title={"Covid 19 Tracker"} toggleDarkMode={this.toggleDarkMode.bind(this)} darkMode={this.state.darkMode}/>
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-lg-3">
                          <InfectionStats entry={GetInfections()[0]} />
                      </div>
                      <div className="col-lg-9">
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

  toggleDarkMode(event: any) {
      this.setState({darkMode: !this.state.darkMode});
  }
}
