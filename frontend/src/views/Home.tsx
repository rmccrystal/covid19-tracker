import React, {Component} from 'react';
import InfectionStats from "../components/InfectionStats";
import InfectionData from "../shared/InfectionData";
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
                        <InfectionTable entries={this.props.data.getInfections()} title={"Global"}/>
                        {this.getRegionalInfectionTables()}
                    </div>
                </div>
            </div>
        )
    }

    getRegionalInfectionTables() {  // All the infection tables excluding global
        return <div>
            {this.props.data.getCategories().map(category => {
                return <InfectionTable entries={this.props.data.getInfectionsByCategory(category)} title={category} />
            })}
        </div>
    }
}
