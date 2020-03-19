import React, {Component} from 'react';
import InfectionStats from "../components/InfectionStats";
import {getAllInfections} from "../data/data";
import InfectionTable from "../components/InfectionTable";

export default class Home extends Component {
    render() {
        return (
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col col-lg-3 mb-4">
                        <InfectionStats entries={getAllInfections()}/>
                    </div>
                    <div className="col col-lg-9">
                        <InfectionTable entries={getAllInfections()} region={"Global"}/>
                        <InfectionTable entries={getAllInfections()} region={"Global"}/>
                    </div>
                </div>
            </div>
        )
    }
}