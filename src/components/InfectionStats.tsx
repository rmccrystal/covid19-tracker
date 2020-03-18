import React, {Component} from "react";
import {Card, Colors, Divider, H1} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import './InfectionStats.scss';
import {InfectionEntry} from "../infections";

interface InfectionStatsProps {
    entry: InfectionEntry
}

export default class InfectionStats extends Component<InfectionStatsProps> {
    render() {
        return <div className="container mt-4">
            <Card elevation={Elevation.TWO} className="infection-card" interactive>
                <H1>{this.props.entry.region}</H1>
                <div className="statistic-container">
                    <p className="statistic" style={{color: Colors.INDIGO3}}>{this.props.entry.infections}</p>
                    <span className="statistic-label">total cases</span>
                </div>
                <Divider/>
                <div className="statistic-container">
                    <p className="statistic" style={{color: Colors.ORANGE3}}>{this.props.entry.active}</p>
                    <span className="statistic-label">active cases</span>
                </div>
                <Divider/>
                <div className="statistic-container">
                    <p className="statistic" style={{color: Colors.RED3}}>{this.props.entry.dead}</p>
                    <span className="statistic-label">total deaths</span>
                </div>
                <Divider/>
                <div className="statistic-container">
                    <p className="statistic" style={{color: Colors.GREEN3}}>{this.props.entry.recovered}</p>
                    <span className="statistic-label">total recoveries</span>
                </div>
            </Card>
        </div>
    }
}