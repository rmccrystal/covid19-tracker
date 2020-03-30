import React, {Component} from "react";
import {Button, Card, Colors, Divider, H1, MenuItem} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import './InfectionStats.scss';
import InfectionEntry from "../shared/InfectionEntry";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ItemRenderer, Select} from "@blueprintjs/select";
import IInfectionEntry from "../shared/IInfectionEntry";
import InfectionEntrySelector from "./InfectionEntrySelector";

interface InfectionStatsProps {
    entries: InfectionEntry[]
}

interface InfectionStatsState {
    selectedEntry: InfectionEntry;
}

export default class InfectionStats extends Component<InfectionStatsProps, InfectionStatsState> {
    constructor(props: InfectionStatsProps) {
        super(props);
        this.state = {
            selectedEntry: this.props.entries[0]
        }
    }

    componentDidMount(): void {
        this.updatePageTitle()
    }

    componentDidUpdate(): void {
        this.updatePageTitle()
    }

    updatePageTitle() {
        document.title = `Covid19 Tracker » ${this.state.selectedEntry.infectionsString()} (${this.state.selectedEntry.region})`
    }

    render() {
        return (
            <Card elevation={Elevation.TWO} className="infection-card text-center" style={{width: "100%"}}>
                <InfectionEntrySelector entries={this.props.entries} onSelect={this.setSelectedEntry.bind(this)} defaultEntry={this.props.entries[0]} />
                {this.renderEntry(this.state.selectedEntry)}
            </Card>
        )
    }

    renderEntry(entry: InfectionEntry) {
        return (<div>
            <div className="statistic-container">
                <p className="statistic" style={{color: Colors.INDIGO3}}><FontAwesomeIcon
                    icon={Icons.faInfoCircle}/> {entry.infectionsString()}</p>
                {/*<p className="statistic-info" style={{color: Colors.INDIGO3}}>{}% of {this.props.entry.region} population</p>*/}
                <span className="statistic-label">total cases</span>
            </div>
            <Divider/>
            <div className="statistic-container">
                <p className="statistic" style={{color: Colors.ORANGE3}}><FontAwesomeIcon
                    icon={Icons.faBed}/> {entry.activeString()}</p>
                {/*<p className="statistic-info" style={{color: Colors.ORANGE3}}>({Math.round((this.props.entry.active/this.props.entry.infections)*100)}% of total cases)</p>*/}
                <span className="statistic-label">active cases</span>
            </div>
            <Divider/>
            <div className="statistic-container">
                <p className="statistic" style={{color: Colors.RED3}}><FontAwesomeIcon
                    icon={Icons.faSkull}/> {entry.deadString()}</p>
                <span className="statistic-label">total deaths</span>
            </div>
            <Divider/>
            <div className="statistic-container">
                <p className="statistic" style={{color: Colors.GREEN3}}><FontAwesomeIcon
                    icon={Icons.faHeartbeat}/> {entry.recoveredString()}</p>
                <span className="statistic-label">total recoveries</span>
            </div>
        </div>)
    }

    setSelectedEntry(entry: IInfectionEntry) {
        this.setState({selectedEntry: entry as InfectionEntry});
    }
}