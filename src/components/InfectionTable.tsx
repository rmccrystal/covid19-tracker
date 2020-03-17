import React, {Component} from "react";
import {InfectionEntry} from "../infections";
import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {InputGroup} from "@blueprintjs/core";

interface InfectionTableProps {
    entries: InfectionEntry[]
}

interface ComponentState {
    filter: string
}

export default class InfectionTable extends Component<InfectionTableProps, ComponentState> {
    componentDidMount(): void {
        this.setState({filter: ""});
    }

    render() {
        return <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>
                        <span style={{display: "flex"}}>
                            <p style={{margin: "0 auto", marginRight: "0.5rem"}}>Region</p>
                            <InputGroup
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
            </TableHeader>
            <TableBody>
                {this.getTableElements()}
            </TableBody>
        </Table>
    }

    getTableElements() {
        let entries = this.props.entries;
        if(this.state != null) {      // If we don't have an empty state, filter our array
            entries = this.props.entries.filter(value => value.region.includes(this.state.filter));
        }
        return entries.map(entry => {
            return <TableRow>
                <TableCell>{entry.region}</TableCell>
                <TableCell>{entry.infections}</TableCell>
                <TableCell>{entry.dead}</TableCell>
                <TableCell>{entry.recovered}</TableCell>
            </TableRow>
        })
    }
}