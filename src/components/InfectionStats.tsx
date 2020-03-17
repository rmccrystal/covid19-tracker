import React, {Component} from "react";
import {Card} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import './InfectionStats.scss';

interface InfectionStatsProps {
    title: string
    infections: number;
    deaths: number;
    recovered: number;
}

export default class InfectionStats extends Component<InfectionStatsProps> {
    render() {
        return <div className="container m-5" style={{width: "100%"}}>
            <Card elevation={Elevation.TWO} className="infection-card" interactive>

            </Card>
        </div>
    }
}