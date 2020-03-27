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
            dataLoaded: true,
            data: new InfectionData([
                new InfectionEntry("United States", 100, 10, 50),
                new InfectionEntry("France", 1000, 42, 77),
                new InfectionEntry("asddf", 532, 12, 76),
                new InfectionEntry("asdasdf", 532, 12, 76),
                new InfectionEntry("q", 532, 12, 76),
                new InfectionEntry("dabasdf", 532, 12, 76),
                new InfectionEntry("asdadf", 532, 12, 76),
                new InfectionEntry("adsdf", 532, 12, 76),
                new InfectionEntry("aeqqsdf", 532, 12, 76),
                new InfectionEntry("asedf", 532, 12, 76),
                new InfectionEntry("aseeeedf", 532, 12, 76),
                new InfectionEntry("asqedf", 532, 12, 76),
                new InfectionEntry("azzsdf", 532, 12, 76),
                new InfectionEntry("asdxf", 532, 12, 76),
                new InfectionEntry("ascdf", 532, 12, 76),
                new InfectionEntry("asvdf", 532, 12, 76),
                new InfectionEntry("asbdf", 532, 12, 76),
                new InfectionEntry("asndf", 532, 12, 76),
                new InfectionEntry("asdmf", 532, 12, 76),
                new InfectionEntry("ajsdf", 532, 12, 76),
                new InfectionEntry("asdrwf", 532, 12, 76),
                new InfectionEntry("tre", 12312, 3, 5675)
            ]),
        }
    }

    componentDidMount(): void {
        getDataFromServer().then(data => {
            this.setState({
                darkMode: this.state.darkMode,
                dataLoaded: true,
                data: data
            });
        })
        .catch(reason => {
            alert(reason);
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
                </Router>
            </div>
        );
    }

    toggleDarkMode(event: any) {
        this.setState({darkMode: !this.state.darkMode});
    }
}

