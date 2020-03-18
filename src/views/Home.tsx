import React, {Component} from 'react';
import InfectionStats from "../components/InfectionStats";
import {GetInfections} from "../infections";
import InfectionTable from "../components/InfectionTable";

export default class Home extends Component {
    render() {
        return (
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col col-lg-3 mb-4">
                        <InfectionStats entry={GetInfections()[0]}/>
                    </div>
                    <div className="col col-lg-9">
                        <InfectionTable entries={GetInfections()} region={"Global"}/>
                        <InfectionTable entries={GetInfections()} region={"Global"}/>
                    </div>
                </div>
            </div>
        )
    }
}