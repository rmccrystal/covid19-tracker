import React, {Component} from "react";

import WorldMap from "./screenshots/world.png";
import USMap from "./screenshots/us.png";
import AsiaMap from "./screenshots/asia.png";
import EuropeMap from "./screenshots/europe.png";
import "./Map.scss";
import {Card} from "@blueprintjs/core";
import {Tab, Tabs} from "@blueprintjs/core";

interface MapState {
    selectedMap: string;
}

export default class Map extends Component<{}, MapState> {
    constructor() {
        super({});
        this.state = {selectedMap: USMap};
    }

    render() {
        return (
            <div className="container-fluid maps-container mt-3">
                <Card style={{display: "inline-block"}} className="mb-3 pt-1">
                    <small>Source: New York Times</small>
                    <Tabs
                        id="maps-tabs"
                        vertical={false}
                        defaultSelectedTabId={"us"}
                        onChange={(newTabId => {switch(newTabId) {
                            case "world":
                                this.setState({selectedMap: WorldMap}); break;
                            case "us":
                                this.setState({selectedMap: USMap}); break;
                            case "asia":
                                this.setState({selectedMap: AsiaMap}); break;
                            case "europe":
                                this.setState({selectedMap: EuropeMap}); break;
                        }})}
                    >
                        <Tab id="world" title="World"/>
                        <Tab id="us" title="USA"/>
                        <Tab id="asia" title="Asia"/>
                        <Tab id="europe" title="Europe"/>
                    </Tabs>
                </Card>
                <MapItem alt="map" mapSrc={(this.state.selectedMap)}/>
            </div>
        )
    }
}

interface MapItemProps {
    alt: string
    mapSrc: string
}

function MapItem(props: MapItemProps) {
    return (
        <div className="map-item">
            <Card className="map-card">
                <img src={props.mapSrc} className="map" alt={props.alt}/>
            </Card>
        </div>
    )
}