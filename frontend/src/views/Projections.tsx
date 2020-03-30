import React, {Component} from 'react';
import InfectionChart from "../components/InfectionChart";
import InfectionData from "../shared/InfectionData";

interface ProjectionsProps {
    data: InfectionData
}

export default class Projections extends Component<ProjectionsProps> {
    render() {
        return (
            <div className="container">
                <InfectionChart entries={this.props.data.historicalEntries} type={"infections"}/>
            </div>
        )
    }
}
