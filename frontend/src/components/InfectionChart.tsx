import React, {Component} from "react";
import {Card, Colors} from "@blueprintjs/core";
import HistoricalInfectionEntry from "../shared/HistoricalInfectionEntry";
import {ResponsiveLine, SliceTooltipProps} from "@nivo/line";
import {Theme} from "@nivo/core";
import InfectionEntrySelector from "./InfectionEntrySelector";

import "./InfectionChart.scss"

interface InfectionChartProps {
    entries: HistoricalInfectionEntry[]
    type: "infections" | "dead" | "recovered"
    darkMode: boolean
}

interface InfectionChartState {
    selectedEntry: HistoricalInfectionEntry
}

export default class InfectionChart extends Component<InfectionChartProps, InfectionChartState> {
    constructor(props: InfectionChartProps) {
        // Sort the entries by most cases to least
        super(props);
        this.sortInfectionEntries();
        this.state = {selectedEntry: props.entries[0]};
    }

    sortInfectionEntries() {
        this.props.entries.sort((a, b) => (a.getLatestInfections() < b.getLatestInfections() ? 1 : -1));
    }

    render() {
        this.sortInfectionEntries();
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
                        axisLeft={{format: (n: any) => {
                            return InfectionChart.abbreviateNumber(n)
                        }}}
                        margin={{bottom: 50, right: 50, left: 50, top: 50}}
                        enablePoints={false}
                        enableGridX={false}
                        enableGridY={true}
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

    static abbreviateNumber(number: any): number {
        // 2 decimal places => 100, 3 => 1000, etc
        let decPlaces = Math.pow(10,1);

        // Enumerate number abbreviations
        let abbrev = [ "k", "m", "b", "t" ];

        // Go through the array backwards, so we do the largest first
        for (let i=abbrev.length-1; i>=0; i--) {

            // Convert array index to "1000", "1000000", etc
            let size = Math.pow(10,(i+1)*3);

            // If the number is bigger or equal do the abbreviation
            if(size <= number) {
                // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                // This gives us nice rounding to a particular decimal place.
                number = Math.round(number*decPlaces/size)/decPlaces;

                // Add the letter for the abbreviation
                number += abbrev[i];

                // We are done... stop
                break;
            }
        }

        return number;
    }
}
