import React, {Component} from "react";
import {Card} from "@blueprintjs/core";
import HistoricalInfectionEntry from "../shared/HistoricalInfectionEntry";
import {ResponsiveLine, SliceTooltipProps} from "@nivo/line";

interface InfectionChartProps {
    entry: HistoricalInfectionEntry
    type: "infections" | "dead" | "recovered"
}

export default class InfectionChart extends Component<InfectionChartProps> {
    render() {
        let data = [ {id: "Infections", data: this.props.entry.infections.map(value => {
            return {x: value[0], y: value[1]}
        })}];
        return (
            <Card className="chart-card">
                <p>{this.props.entry.region}</p>
                <div style={{height: "30rem"}}>
                    <ResponsiveLine
                        data={data}
                        margin={{bottom: 50, right: 50, left: 50, top: 50}}
                        enablePoints={false}
                        enableGridX={false}
                        enableGridY={true}
                        gridYValues={[1,2,3,4,5]}
                        isInteractive
                        enableSlices={'x'}
                        sliceTooltip={(props: SliceTooltipProps) => {
                            return (
                                <Card className="p-2">
                                    <h5>{this.getDate(props.slice.points[0].data.x).getUTCMonth()}</h5>
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
        if(typeof days !== "number") {
            return new Date();
        }

        let date = this.props.entry.firstCase;
        if(!date) {
            return new Date();
        }
        const copy = new Date(Number(date));
        copy.setDate(date.getDate() + days);
        return copy
    }
}
