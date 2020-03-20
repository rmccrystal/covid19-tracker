import React, {Component} from 'react';

import './App.scss';

import Nav from "./components/Nav";
import Home from "./views/Home";
import {Route, BrowserRouter as Router} from "react-router-dom";
import About from "./views/About";
import InfectionData, {getDataFromServer} from "./data/InfectionData";
import LoadingScreen from "./components/LoadingScreen";

interface AppProps {}

interface AppState {
    darkMode: boolean;
    dataLoaded: boolean;
    data: InfectionData;
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: Readonly<AppProps>) {
        super(props);
        this.state = {
            darkMode: false,
            dataLoaded: false,
            data: new InfectionData([]),
        }
    }

    componentDidMount(): void {
        getDataFromServer().then((data => {
            setTimeout(() => {
                this.setState({
                    darkMode: this.state.darkMode,
                    dataLoaded: true,
                    data: data
                })
            }, 1000);
        })).catch((reason => {
            alert(reason);      // TODO: Change this
        }))
    }

    render() {
        let themeClass = this.state.darkMode ? "bp3-dark" : "bp3-light";
        return (
            <div className={`app ${themeClass}`}>
                <Router>
                    <Nav title={"Covid 19 Tracker"} toggleDarkMode={this.toggleDarkMode.bind(this)}
                         darkMode={this.state.darkMode}/>
                    <Route path={"/"} exact>
                        {
                            this.state.dataLoaded ? <Home data={this.state.data} /> : <LoadingScreen text={"asdf"}/>
                        }
                    </Route>
                    <Route path={"/about"} component={About}/>
                </Router>
            </div>
        );
    }

    toggleDarkMode(event: any) {
        this.setState({darkMode: !this.state.darkMode});
    }
}

