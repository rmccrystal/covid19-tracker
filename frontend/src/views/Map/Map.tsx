import React, {Component} from "react";

import WorldMap from "./screenshots/world.png";
import USMap from "./screenshots/us.png";
import AsiaMap from "./screenshots/asia.png";
import EuropeMap from "./screenshots/europe.png";
import "./Map.scss";
import {Card} from "@blueprintjs/core";
import {Tab, Tabs} from "@blueprintjs/core";
import InfectionMap from "../../components/InfectionMap";
import InfectionEntry from "../../shared/InfectionEntry";
import InfectionData from "../../shared/InfectionData";

interface MapProps {
    data: InfectionData;
    darkMode: boolean;
}

export default class Map extends Component<MapProps> {
    render() {
        return (
            <div className="container-fluid maps-container">
                {/*<Card style={{display: "inline-block"}} className="mt-2 mb-2 p-1 pl-3 pr-3">*/}
                {/*    <Tabs*/}
                {/*        id="maps-tabs"*/}
                {/*        vertical={false}*/}
                {/*        defaultSelectedTabId={"us"}*/}
                {/*        onChange={(newTabId => {switch(newTabId) {*/}
                {/*            case "world":*/}
                {/*                this.setState({selectedMap: WorldMap}); break;*/}
                {/*            case "us":*/}
                {/*                this.setState({selectedMap: USMap}); break;*/}
                {/*            case "asia":*/}
                {/*                this.setState({selectedMap: AsiaMap}); break;*/}
                {/*            case "europe":*/}
                {/*                this.setState({selectedMap: EuropeMap}); break;*/}
                {/*        }})}*/}
                {/*    >*/}
                {/*        <Tab id="world" title="World"/>*/}
                {/*        <Tab id="us" title="USA"/>*/}
                {/*        <Tab id="asia" title="Asia"/>*/}
                {/*        <Tab id="europe" title="Europe"/>*/}
                {/*    </Tabs>*/}
                {/*</Card>*/}
                <div className="map-item mt-3">
                    <Card className="map-card">
                        <InfectionMap
                            entries={this.props.data.entries.filter(entry => entry.category == undefined)}
                            darkMode={this.props.darkMode} />
                    </Card>
                </div>
            </div>
        )
    }
}
