import React, {Component} from "react";
import {Card, Colors, Divider, H1} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import './InfectionStats.scss';
import {InfectionEntry} from "../infections";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface InfectionStatsProps {
    entry: InfectionEntry
}

export default class InfectionStats extends Component<InfectionStatsProps> {
    render() {
        return <div className="container-fluid">
            <Card elevation={Elevation.TWO} className="infection-card text-center" interactive style={{width: "100%"}}>
                <H1>{this.props.entry.region}</H1>
                <div className="statistic-container">
                    <p className="statistic" style={{color: Colors.INDIGO3}}><FontAwesomeIcon icon={Icons.faInfoCircle}/> {this.props.entry.infections}</p>
                    {/*<p className="statistic-info" style={{color: Colors.INDIGO3}}>{}% of {this.props.entry.region} population</p>*/}
                    <span className="statistic-label">total cases</span>
                </div>
                <Divider/>
                <div className="statistic-container">
                    <p className="statistic" style={{color: Colors.ORANGE3}}><FontAwesomeIcon icon={Icons.faBed}/> {this.props.entry.active}</p>
                    {/*<p className="statistic-info" style={{color: Colors.ORANGE3}}>({Math.round((this.props.entry.active/this.props.entry.infections)*100)}% of total cases)</p>*/}
                    <span className="statistic-label">active cases</span>
                </div>
                <Divider/>
                <div className="statistic-container">
                    <p className="statistic" style={{color: Colors.RED3}}><FontAwesomeIcon icon={Icons.faSkull}/> {this.props.entry.dead}</p>
                    <span className="statistic-label">total deaths</span>
                </div>
                <Divider/>
                <div className="statistic-container">
                    <p className="statistic" style={{color: Colors.GREEN3}}><FontAwesomeIcon icon={Icons.faHeartbeat}/> {this.props.entry.recovered}</p>
                    <span className="statistic-label">total recoveries</span>
                </div>
            </Card>
        </div>
    }
}