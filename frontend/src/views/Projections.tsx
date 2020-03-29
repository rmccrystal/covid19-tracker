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
                <InfectionChart entry={this.props.data.historicalEntries[225]} type={"infections"}/>
            </div>
        )
    }
}
