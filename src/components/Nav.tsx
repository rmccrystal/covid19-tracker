import React, {Component} from "react";
import {Button, Classes, H3, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/esm/common/alignment";

interface NavProps {
    title: string;
}

export default class Nav extends Component<NavProps> {
    render() {
        return <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading><H3>{this.props.title}</H3></NavbarHeading>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="home" text="Home" />
            </NavbarGroup>
        </Navbar>
    }
}