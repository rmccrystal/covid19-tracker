import React, {Component} from "react";
import InfectionEntry from "../shared/InfectionEntry";
import {Card, Elevation, H2, HTMLTable, Icon, InputGroup} from "@blueprintjs/core";
import "./InfectionTable.scss"
import {useTable, useSortBy, TableState} from "react-table";

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
                    <InfectionTableComponent entries={this.props.entries}/>
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
            accessor: "region",
        },
        {
            Header: "Infections",
            accessor: "infections",
            sortDescFirst: true
        },
        {
            Header: "Deaths",
            accessor: "dead",
            sortDescFirst: true
        },
        {
            Header: "Recovered",
            accessor: "recovered",
            sortDescFirst: true
        }], []);

    const sorted = [{id: "infections", desc: true}];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data}, useSortBy);

    return (
        <Card className="infection-table-card">
            <HTMLTable {...getTableProps()} condensed striped interactive small bordered className="infection-table">
                <thead className="infection-table-thead">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span style={{float: "right"}}>
                                    {
                                        column.canSort ? column.isSorted ? (column.isSortedDesc ? <Icon icon="chevron-down" /> : <Icon icon="chevron-up" />) : <Icon icon="expand-all" /> : {}
                                    }
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()} className="infection-table-content">
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{isNaN(cell.value) ? cell.value : cell.value.toLocaleString()}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </HTMLTable>
        </Card>
    )
}