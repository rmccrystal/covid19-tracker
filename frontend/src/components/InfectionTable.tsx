import React, {Component} from "react";
import InfectionEntry from "../shared/InfectionEntry";
import {Card, Elevation, H2, InputGroup} from "@blueprintjs/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { Colors } from "@blueprintjs/core";
import "./InfectionTable.scss"
import {Cell, Column, SelectionModes, Table} from "@blueprintjs/table";
import {useTable} from "react-table";

interface InfectionTableProps {
    entries: InfectionEntry[]
    title: string
}

interface ComponentState {
    filter: string
}

export default class InfectionTable extends Component<InfectionTableProps, ComponentState> {
    componentDidMount(): void {
        this.setState({filter: ""});
    }

    render() {  // TODO: Add sorting
        return (
            <div className="container-fluid mb-4 col infection-table">
                <Card elevation={Elevation.TWO}>
                    <H2 className="text-left">
                        {this.props.title}
                    </H2>
                    <InfectionTableComponent entries={this.props.entries} />
            </Card>
        </div>)
    }
}

interface InfectionTableComponentProps {
    entries: InfectionEntry[]
}

const InfectionTableComponent = (props: InfectionTableComponentProps) => {
    const data = React.useMemo(() => props.entries, []);
    const columns = React.useMemo(() => [
        {
            Header: "Region",
            accessor: "country"
        },
        {
            Header: "Infections",
            accessor: "infections"
        },
        {
            Header: "Deaths",
            accessor: "dead"
        },
        {
            Header: "Recovered",
            accessor: "recovered"
        }], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}