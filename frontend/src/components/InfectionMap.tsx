import React, {Component} from "react";
import InfectionEntry from "../shared/InfectionEntry";
import {Chart, GeoChartOptions} from "react-google-charts";
import {Colors} from "@blueprintjs/core";

interface InfectionMapProps {
    entries: InfectionEntry[]
    region?: string      // Region ID
    darkMode: boolean
}

export default class InfectionMap extends Component<InfectionMapProps> {
    render() {
        let data: Array<[string, string | number]> = [['Region', 'Infections']];

        // Some countries need to be renamed for the map to work
        let changedCountries: Map<string, string> = new Map<string, string>();
        changedCountries.set("USA", "United States");
        changedCountries.set("Congo", "Democratic Republic of the Congo");

        this.props.entries.forEach(_entry => {
            let entry = Object.assign({}, _entry);

            changedCountries.forEach((value, key) => {
                if (entry.region == key) {
                    entry.region = value;
                }
            });
            if(entry.infections) {
                console.log(entry);
                data.push([entry.region, entry.infections])
            }
        });
        return (
            <div className="infection-map">
                <Chart

                    chartType="GeoChart"
                    graph_id="infection-map"
                    width={'100%'}
                    height={'100%'}
                    data={data}
                    options={{
                        region: this.props.region,
                        colorAxis: { colors: [ "#b2d7ed", Colors.BLUE2, Colors.BLUE2, Colors.BLUE1, Colors.BLUE1, Colors.BLUE1] },
                        datalessRegionColor: this.props.darkMode ? Colors.GRAY4 : Colors.LIGHT_GRAY1,
                        backgroundColor: this.props.darkMode ? Colors.DARK_GRAY4 : Colors.WHITE
                    }}
                    mapsApiKey="AIzaSyC2rP6K0Os3t4bunDF1RqXeQKF128UC0Ig"/>
            </div>
        )
    }
}