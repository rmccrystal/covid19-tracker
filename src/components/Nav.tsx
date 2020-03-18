import React, {Component, EventHandler, MouseEventHandler} from "react";
import {Button, Classes, H3, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/esm/common/alignment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon} from "@fortawesome/free-regular-svg-icons";
import {faSun} from "@fortawesome/free-solid-svg-icons";

interface NavProps {
    title: string;
    toggleDarkMode: MouseEventHandler;
    darkMode: boolean;
}

export default class Nav extends Component<NavProps> {
    render() {
        return <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading><H3>{this.props.title}</H3></NavbarHeading>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="home" text="Home" />
                <Button className={Classes.MINIMAL} icon="map" text="Map" />
                <Button className={Classes.MINIMAL} icon="timeline-area-chart" text="Projections" />
                <Button className={Classes.MINIMAL} icon="book" text="Wiki" />
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="info-sign" text="About" />
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Button className={Classes.MINIMAL} onClick={this.props.toggleDarkMode} icon={"contrast"} />
            </NavbarGroup>
        </Navbar>
    }
}