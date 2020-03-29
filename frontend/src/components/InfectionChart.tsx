import React, {Component} from "react";
import {Card} from "@blueprintjs/core";
import HistoricalInfectionEntry from "../shared/HistoricalInfectionEntry";
import {ResponsiveLine, SliceTooltipProps} from "@nivo/line";
import InfectionEntrySelector from "./InfectionEntrySelector";

import "./InfectionChart.scss"

interface InfectionChartProps {
    entries: HistoricalInfectionEntry[]
    type: "infections" | "dead" | "recovered"
}

interface InfectionChartState {
    selectedEntry: HistoricalInfectionEntry
}

export default class InfectionChart extends Component<InfectionChartProps, InfectionChartState> {
    constructor(props: InfectionChartProps) {
        // Sort the entries by most cases to least
        super(props);
        this.sortInfectionEntries()
        this.state = {selectedEntry: props.entries[0]};
    }

    componentDidUpdate() {
        this.sortInfectionEntries()
    }

    sortInfectionEntries() {
        this.props.entries.sort((a, b) => (a.getLatestInfections() < b.getLatestInfections() ? 1 : -1));
    }

    render() {
        let data = [{
            id: "Infections", data: this.state.selectedEntry.infections.map(value => {
                return {x: value[0], y: value[1]}
            })
        }];
        return (
            <Card className="chart-card m-3">
                <div className="text-center">
                    <InfectionEntrySelector
                        entries={this.props.entries}
                        onSelect={entry => {
                            this.setState({selectedEntry: entry as HistoricalInfectionEntry})
                        }}
                        defaultEntry={this.state.selectedEntry}/>
                        <h2>Past {this.state.selectedEntry.getDaysSinceFirstCase()} days</h2>
                </div>
                <div style={{height: "30rem"}} className="chart-container">
                    <ResponsiveLine
                        data={data}
                        margin={{bottom: 50, right: 50, left: 50, top: 50}}
                        enablePoints={false}
                        enableGridX={false}
                        enableGridY={true}
                        gridYValues={[1, 2, 3, 4, 5]}
                        isInteractive
                        enableSlices={'x'}
                        sliceTooltip={(props: SliceTooltipProps) => {
                            return (
                                <Card className="p-2">
                                    <h5>{this.getDate(props.slice.points[0].data.x).toDateString().slice(4, -5)}</h5>
                                    <p>{props.slice.points[0].data.y.toLocaleString()} infections</p>
                                </Card>
                            )
                        }}
                    />
                </div>
            </Card>
        )
    }

    // Gets the date from the number of days past first infection
    getDate(days: string | number | Date): Date {
        if (typeof days !== "number") {
            return new Date();
        }

        let date = this.state.selectedEntry.firstCase;
        if (!date) {
            return new Date();
        }
        const copy = new Date(Number(date));
        copy.setDate(date.getDate() + days);
        return copy
    }
}
