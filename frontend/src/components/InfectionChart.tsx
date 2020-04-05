import React, {Component, CSSProperties} from "react";
import {Card, Colors, Radio, FormGroup, RadioGroup, Switch, NumericInput, Label} from "@blueprintjs/core";
import HistoricalInfectionEntry from "../shared/HistoricalInfectionEntry";
import {ResponsiveLine, SliceTooltipProps} from "@nivo/line";
import {Theme} from "@nivo/core";
import InfectionEntrySelector from "./InfectionEntrySelector";
import regression from "regression"

import "./InfectionChart.scss"

interface InfectionChartProps {
    entries: HistoricalInfectionEntry[]
    darkMode: boolean
}

interface InfectionChartState {
    selectedEntry: HistoricalInfectionEntry
    chartType: "infections" | "dead" | "recovered"
    regression: boolean;
    regressionDays: number;
}

export default class InfectionChart extends Component<InfectionChartProps, InfectionChartState> {
    constructor(props: InfectionChartProps) {
        // Sort the entries by most cases to least
        super(props);
        this.sortInfectionEntries();
        this.state = {
            selectedEntry: props.entries[0],
            chartType: "infections",
            regression: false,
            regressionDays: 10
        };
    }

    sortInfectionEntries() {
        this.props.entries.sort((a, b) => (a.getLatestInfections() < b.getLatestInfections() ? 1 : -1));
    }

    // Returns the predictions and the R^2
    predict(_data: [{x: number, y: number}], days: number): [Array<{x: number, y: number}>, number] {
        // Because we're calculating the first day, we should increase the number of days we actually calculate
        days++;
        let data: Array<[number, number]> = _data
            .map(val => [val.x, val.y]);

        // Offset the entire list to the first non zero Y value
        let firstNonZero = 0;
        for(let i=0; i<data.length; i++) {
            if(data[i][1] == 0) {
                firstNonZero = data[i][0];
            }
        }
        data = data.map(val => [val[0] - firstNonZero, val[1]]);
        data = data.filter(val => val[0] > 0);
        const regr = regression.exponential(data);
        let result: Array<{x: number, y: number}> = [];
        // we need to calculate after the line so we find the max
        let startingValue: number = 0;
        _data.forEach(val => {
            if(val.x > startingValue) {
                startingValue = val.x
            }
        });

        startingValue-=firstNonZero;
        // delta is the difference between the last data point and the first predicted point
        // we use this to align the predicted and actual
        let lastValue = data[data.length-1][1];
        let delta = regr.predict(startingValue)[1] - lastValue;

        for(let i=startingValue; i<startingValue+days; i++) {
            result.push({x: i+firstNonZero, y: Math.round(regr.predict(i)[1]-delta)})
        }
        return [result, regr.r2];
    }

    render() {
        this.sortInfectionEntries();
        let data: import("@nivo/line").Serie[] = [];
        let labelString: string = "";

        switch (this.state.chartType) {
            case "infections":
                data = [{
                    id: "Infections", data: this.state.selectedEntry.infections.map(value => {
                        return {x: value[0], y: value[1]}
                    })
                }];
                labelString = "infections";
                break;
            case "recovered":
                data = [{
                    id: "Recovered", data: this.state.selectedEntry.recovered.map(value => {
                        return {x: value[0], y: value[1]}
                    })
                }];
                labelString = "recovered";
                break;
            case "dead":
                data = [{
                    id: "Dead", data: this.state.selectedEntry.dead.map(value => {
                        return {x: value[0], y: value[1]}
                    })
                }];
                labelString = "dead";
        }

        let r2: number | undefined = undefined;
        if(this.state.regression) {
            // @ts-ignore
            let [predictedData, _r2] = this.predict(data[0].data, this.state.regressionDays);
            r2 = _r2;
            data.push({
                id: "Predicted",
                data: predictedData
            });
        }

        const theme: Theme = {
            grid: {
                line: {
                    stroke: "rgba(0,0,0,0.1)",
                }
            },
            axis: {
                ticks: {
                    text: {
                        fill: this.props.darkMode ? "#eee" : "#111",
                        fontSize: 12,
                    },
                    line: {
                        stroke: "rgba(0,0,0,0.3)",
                        strokeWidth: 1,
                    }
                },
                domain: {
                    line: {
                        stroke: "rgba(0,0,0,0.3)",
                        strokeWidth: 1,
                    }
                },
            },
        };

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
                        axisLeft={{
                            format: (n: any) => {
                                return InfectionChart.abbreviateNumber(n)
                            }
                        }}
                        margin={{bottom: 50, right: 50, left: 50, top: 50}}
                        enablePoints={false}
                        enableGridX={false}
                        enableGridY={true}
                        theme={theme}
                        isInteractive
                        enableSlices={'x'}
                        sliceTooltip={(props: SliceTooltipProps) => {
                            return (
                                <Card className="p-2">
                                    <h5>{this.getDate(props.slice.points[0].data.x).toDateString().slice(4, -5)}</h5>
                                    <p>{props.slice.points[0].data.y.toLocaleString()} {labelString}</p>
                                </Card>
                            )
                        }}
                    />
                </div>
                <div className="settings-container">
                    <FormGroup>
                        <RadioGroup
                            label="Type"
                            name="type"
                            onChange={(value) => {
                                this.setState({
                                    regression: this.state.regression,
                                    // @ts-ignore
                                    chartType: value.currentTarget.value.toString(),
                                    selectedEntry: this.state.selectedEntry,
                                    regressionDays: this.state.regressionDays
                                })
                            }}
                            selectedValue={this.state.chartType}
                        >
                            <Radio label="Infections" value="infections"/>
                            <Radio label="Deaths" value="dead"/>
                            <Radio label="Recovered" value="recovered"/>
                        </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                        <Switch
                            checked={this.state.regression}
                            label={ r2 ? `Regression (R²=${r2})` : "Regression" }
                            onChange={(value) => {
                                this.setState({
                                    regression: value.currentTarget.checked,
                                    chartType: this.state.chartType,
                                    selectedEntry: this.state.selectedEntry,
                                    regressionDays: this.state.regressionDays
                                })
                            }}/>
                        <Label>
                            Days to predict
                            <NumericInput
                                allowNumericCharactersOnly
                                majorStepSize={10}
                                min={1}
                                max={100}
                                minorStepSize={1}
                                stepSize={1}
                                value={this.state.regressionDays}
                                onValueChange={(value) => {
                                    this.setState({
                                        regression: this.state.regression,
                                        chartType: this.state.chartType,
                                        selectedEntry: this.state.selectedEntry,
                                        // @ts-ignore
                                        regressionDays: value
                                    })
                                }}
                            />
                        </Label>
                    </FormGroup>
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
        let decPlaces = Math.pow(10, 1);

        // Enumerate number abbreviations
        let abbrev = ["k", "m", "b", "t"];

        // Go through the array backwards, so we do the largest first
        for (let i = abbrev.length - 1; i >= 0; i--) {

            // Convert array index to "1000", "1000000", etc
            let size = Math.pow(10, (i + 1) * 3);

            // If the number is bigger or equal do the abbreviation
            if (size <= number) {
                // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                // This gives us nice rounding to a particular decimal place.
                number = Math.round(number * decPlaces / size) / decPlaces;

                // Add the letter for the abbreviation
                number += abbrev[i];

                // We are done... stop
                break;
            }
        }

        return number;
    }
}
