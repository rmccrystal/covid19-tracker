import React, {Component} from 'react';
import InfectionChart from "../components/InfectionChart";
import InfectionData from "../shared/InfectionData";

interface ProjectionsProps {
    data: InfectionData
    darkMode: boolean
}

export default class Projections extends Component<ProjectionsProps> {
    render() {
        return (
            <div className="container">
                <InfectionChart entries={this.props.data.historicalEntries} type={"infections"} darkMode={this.props.darkMode}/>
            </div>
        )
    }
}
