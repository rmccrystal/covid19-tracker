import React, {Component} from 'react';
import InfectionStats from "../components/InfectionStats";
import {getAllInfections, getContinents, getGlobalInfections, getInfectionsFromContinent} from "../data/data";
import InfectionTable from "../components/InfectionTable";

export default class Home extends Component {
    render() {
        return (
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col col-lg-3 mb-4">
                        <InfectionStats entries={[getGlobalInfections()].concat(getAllInfections()) /* combine global and all infections */}/>
                    </div>
                    <div className="col col-lg-9">
                        <InfectionTable entries={getAllInfections()} title={"Global"}/>
                        {this.getRegionalInfectionTables()}
                    </div>
                </div>
            </div>
        )
    }

    getRegionalInfectionTables() {  // All the infection tables excluding global
        return <div>
            {getContinents().map(continent => {
                return <InfectionTable entries={getInfectionsFromContinent(continent)} title={continent} />
            })}
        </div>
    }
}
