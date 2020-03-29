import React, {Component} from "react";
import IInfectionEntry from "../shared/IInfectionEntry";
import InfectionEntry from "../shared/InfectionEntry";
import {Button, Card, H1, MenuItem} from "@blueprintjs/core";
import {ItemRenderer, Select} from "@blueprintjs/select";

const InfectionEntrySelect = Select.ofType<IInfectionEntry>();

const infectionEntryRenderer: ItemRenderer<IInfectionEntry> = (item, itemProps) => {
    if (!itemProps.modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            active={itemProps.modifiers.active}
            key={item.region}
            text={item.region}
            onClick={itemProps.handleClick}
        />
    );
};

interface InfectionEntrySelectorProps {
    entries: IInfectionEntry[]  // List of abstract infection entries
    onSelect: (entry: IInfectionEntry) => void
    defaultEntry: IInfectionEntry
}

interface InfectionEntrySelectorState {
    selectedEntry: IInfectionEntry
}

export default class InfectionEntrySelector extends Component<InfectionEntrySelectorProps, InfectionEntrySelectorState> {
    constructor(props: InfectionEntrySelectorProps) {
        super(props);
        this.state = {selectedEntry: props.defaultEntry}
    }

    render() {
        return (
            <InfectionEntrySelect
                items={this.props.entries}
                itemRenderer={infectionEntryRenderer}
                activeItem={this.state.selectedEntry}
                onItemSelect={this.onSelect.bind(this)}
                itemPredicate={(query: string, item: IInfectionEntry): boolean => {  // Search function
                    return item.region.toLowerCase().includes(query.toLowerCase());
                }}>
                <Button rightIcon="double-caret-vertical" minimal={true}>
                    <H1 style={{textDecoration: "underline"}}>{this.state.selectedEntry.region}</H1>
                </Button>
            </InfectionEntrySelect>

        )
    }

    onSelect(entry: IInfectionEntry) {
        this.setState({selectedEntry: entry})
        this.props.onSelect(entry);
    }
}
