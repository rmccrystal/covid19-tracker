import React, {Component} from 'react';
import './App.scss';
import Nav from "./components/Nav";
import Home from "./views/Home";
import {Route, BrowserRouter as Router} from "react-router-dom";
import About from "./views/About";
import {startDataUpdater} from "./data/backend";

interface AppProps {}

interface AppState {
    darkMode: boolean
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: Readonly<AppProps>) {
        super(props);
        startDataUpdater();
        this.state = {
            darkMode: false
        }
    }

    render() {
        let themeClass = this.state.darkMode ? "bp3-dark" : "bp3-light";
        return (
            <div className={`app ${themeClass}`}>
                <Router>
                    <Nav title={"Covid 19 Tracker"} toggleDarkMode={this.toggleDarkMode.bind(this)}
                         darkMode={this.state.darkMode}/>
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/about"} component={About}/>
                </Router>
            </div>
        );
    }

    toggleDarkMode(event: any) {
        this.setState({darkMode: !this.state.darkMode});
    }
}

