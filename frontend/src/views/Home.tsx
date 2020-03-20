import React, {Component} from 'react';
import InfectionStats from "../components/InfectionStats";
import InfectionData from "../data/InfectionData";
import InfectionTable from "../components/InfectionTable";

interface HomeProps {
    data: InfectionData
}

export default class Home extends Component<HomeProps> {
    render() {
        return (
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col col-lg-3 mb-4">
                        <InfectionStats entries={[this.props.data.getGlobalInfections()].concat(this.props.data.getAllInfections()) /* combine global and all infections */}/>
                    </div>
                    <div className="col col-lg-9">
                        <InfectionTable entries={this.props.data.getAllInfections()} title={"Global"}/>
                        {this.getRegionalInfectionTables()}
                    </div>
                </div>
            </div>
        )
    }

    getRegionalInfectionTables() {  // All the infection tables excluding global
        return <div>
            {this.props.data.getContinents().map(continent => {
                return <InfectionTable entries={this.props.data.getInfectionsByContinent(continent)} title={continent} />
            })}
        </div>
    }
}
