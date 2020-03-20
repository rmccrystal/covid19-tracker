import React, {Component} from "react";
import {Button, Card, Colors, Divider, H1, MenuItem} from "@blueprintjs/core";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import './InfectionStats.scss';
import InfectionEntry from "../data/InfectionEntry";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ItemRenderer, Select} from "@blueprintjs/select";

const InfectionEntrySelect = Select.ofType<InfectionEntry>();

const infectionEntryRenderer: ItemRenderer<InfectionEntry> = (item, itemProps) => {
    if (!itemProps.modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            active={itemProps.modifiers.active}
            key={item.country}
            text={item.country}
            onClick={itemProps.handleClick}
        />
    );
};

interface InfectionStatsProps {
    entries: InfectionEntry[]
}

interface InfectionStatsState {
    selectedEntry: InfectionEntry;
}

export default class InfectionStats extends Component<InfectionStatsProps, InfectionStatsState> {
    constructor(props: InfectionStatsProps) {
        super(props);
        this.state = {
            selectedEntry: this.props.entries[0]
        }
    }

    render() {
        return <div className="container-fluid">
            <Card elevation={Elevation.TWO} className="infection-card text-center" interactive style={{width: "100%"}}>
                <InfectionEntrySelect
                    items={this.props.entries}
                    itemRenderer={infectionEntryRenderer}
                    onItemSelect={this.setSelectedEntry.bind(this)}
                    itemPredicate={(query: string, item: InfectionEntry): boolean => {  // Search function
                        return item.country.toLowerCase().includes(query.toLowerCase());
                    }}>
                    <Button rightIcon="double-caret-vertical" minimal={true}>
                        <H1 style={{textDecoration: "underline"}}>{this.state.selectedEntry.country}</H1>
                    </Button>
                </InfectionEntrySelect>
                {this.renderEntry(this.state.selectedEntry)}
            </Card>
        </div>
    }

    renderEntry(entry: InfectionEntry) {
        return (<div>
            <div className="statistic-container">
                <p className="statistic" style={{color: Colors.INDIGO3}}><FontAwesomeIcon
                    icon={Icons.faInfoCircle}/> {entry.infections}</p>
                {/*<p className="statistic-info" style={{color: Colors.INDIGO3}}>{}% of {this.props.entry.region} population</p>*/}
                <span className="statistic-label">total cases</span>
            </div>
            <Divider/>
            <div className="statistic-container">
                <p className="statistic" style={{color: Colors.ORANGE3}}><FontAwesomeIcon
                    icon={Icons.faBed}/> {entry.active}</p>
                {/*<p className="statistic-info" style={{color: Colors.ORANGE3}}>({Math.round((this.props.entry.active/this.props.entry.infections)*100)}% of total cases)</p>*/}
                <span className="statistic-label">active cases</span>
            </div>
            <Divider/>
            <div className="statistic-container">
                <p className="statistic" style={{color: Colors.RED3}}><FontAwesomeIcon
                    icon={Icons.faSkull}/> {entry.dead}</p>
                <span className="statistic-label">total deaths</span>
            </div>
            <Divider/>
            <div className="statistic-container">
                <p className="statistic" style={{color: Colors.GREEN3}}><FontAwesomeIcon
                    icon={Icons.faHeartbeat}/> {entry.recovered}</p>
                <span className="statistic-label">total recoveries</span>
            </div>
        </div>)
    }

    setSelectedEntry(entry: InfectionEntry) {
        this.setState({selectedEntry: entry});
    }
}