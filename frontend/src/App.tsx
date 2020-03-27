import React, {Component} from 'react';

import './App.scss';

import Nav from "./components/Nav";
import Home from "./views/Home";
import {Route, BrowserRouter as Router} from "react-router-dom";
import About from "./views/About";
import InfectionData from "./shared/InfectionData";
import LoadingScreen from "./components/LoadingScreen";
import FadeIn from "react-fade-in";
import {getDataFromServer} from "./data/backend";
import InfectionEntry from "./shared/InfectionEntry";
import Wiki from "./views/Wiki";

interface AppProps {
}

interface AppState {
    darkMode: boolean;
    dataLoaded: boolean;
    data: InfectionData;
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: Readonly<AppProps>) {
        super(props);
        this.state = {
            darkMode: true,
            dataLoaded: false,
            data: new InfectionData([])
        }
    }

    componentDidMount(): void {
        this.updateInefctionData();
        setInterval(this.updateInefctionData.bind(this), 60000);    // Update data every 60 seconds
    }

    updateInefctionData() {
        getDataFromServer().then(data => {
            this.setState({
                darkMode: this.state.darkMode,
                dataLoaded: true,
                data: data
            });
        })
            .catch(reason => {
                setTimeout(this.updateInefctionData.bind(this), 3000) // Try again in 3 seconds if it doesn't work
            });
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
                            this.state.dataLoaded ?
                                <Home data={this.state.data}/>
                                :
                                <FadeIn>
                                    <LoadingScreen text={"Fetching latest data..."}/>
                                </FadeIn>
                        }
                    </Route>
                    <Route path={"/about"} component={About}/>
                    <Route path={"/wiki"} component={Wiki}/>
                </Router>
            </div>
        );
    }

    toggleDarkMode(event: any) {
        this.setState({darkMode: !this.state.darkMode});
    }
}

