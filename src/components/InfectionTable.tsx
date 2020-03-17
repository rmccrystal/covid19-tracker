import React, {Component} from "react";
import {InfectionEntry} from "../infections";
import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {Card, Elevation, H2, InputGroup} from "@blueprintjs/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from '@fortawesome/free-solid-svg-icons';

interface InfectionTableProps {
    entries: InfectionEntry[]
    region: string
}

interface ComponentState {
    filter: string
}

export default class InfectionTable extends Component<InfectionTableProps, ComponentState> {
    componentDidMount(): void {
        this.setState({filter: ""});
    }

    render() {  // TODO: Add sorting
        return <div className="container m-4">
                <Card elevation={Elevation.TWO}>
                <H2 className="text-left">
                    {this.props.region}
                </H2>
                <Table celled unstackable selectable very compact striped>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>
                                <span style={{display: "flex"}}>
                                    <InputGroup
                                        style={{marginTop: 0, marginBottom: 0}}
                                        fill={true}
                                        leftIcon={"filter"}
                                        small={true}
                                        placeholder="Filter region..."
                                        onChange={(event: any) => {
                                            this.setState({filter: event.target.value})
                                        }}
                                    />
                                </span>
                            </TableHeaderCell>
                            <TableHeaderCell>Infections</TableHeaderCell>
                            <TableHeaderCell>Deaths</TableHeaderCell>
                            <TableHeaderCell>Recoveries</TableHeaderCell>
                        </TableRow>
                        {this.renderEntry(this.getTotal())}
                    </TableHeader>
                    <TableBody>
                        {this.getTableElements()}
                    </TableBody>
                </Table>
            </Card>
        </div>
    }

    getTableElements() {
        let entries = this.props.entries;
        if(this.state != null) {      // If we don't have an empty state, filter our array
            entries = this.props.entries.filter(value => value.region.includes(this.state.filter));
        }
        return entries.map(entry => {
            return this.renderEntry(entry);
        })
    }

    // Renders a single infection entry. If `header` is true, the entry will render as a header
    renderEntry(entry: InfectionEntry, header: boolean = false) {
        return <TableRow>
            <TableCell>{entry.region}</TableCell>
            <TableCell style={{color: "#5642A6"}}><FontAwesomeIcon icon={Icons.faInfoCircle}/> {entry.infections}</TableCell>
            <TableCell style={{color: "#A82A2A"}}><FontAwesomeIcon icon={Icons.faSkull}/> {entry.dead}</TableCell>
            <TableCell style={{color: "#0A6640"}}><FontAwesomeIcon icon={Icons.faHeartbeat}/> {entry.recovered}</TableCell>
        </TableRow>
    }

    getTotal(): InfectionEntry {
        let region = "Total";
        let entries = this.props.entries;
        return entries.reduce((previousValue, currentValue) => {
            return new InfectionEntry(region,
                previousValue.infections + currentValue.infections,
                previousValue.dead + currentValue.dead,
                previousValue.recovered + currentValue.recovered)},
        new InfectionEntry(region, 0, 0, 0));
    }
}