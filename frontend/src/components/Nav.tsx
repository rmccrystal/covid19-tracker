import React, {Component, MouseEventHandler} from "react";
import {Button, Classes, H3, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {Alignment} from "@blueprintjs/core/lib/esm/common/alignment";
import {Link} from "react-router-dom";

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
                <Link className="bp3-button-text" to={"/"}><Button className={Classes.MINIMAL} icon="home" text="Home"/></Link>
                <Link className="bp3-button-text" to={"/map"}><Button className={Classes.MINIMAL} icon="map" text="Map" /></Link>
                <Link className="bp3-button-text" to={"/projections"}><Button className={Classes.MINIMAL} icon="timeline-area-chart" text="Projections" /></Link>
                <Link className="bp3-button-text" to={"/wiki"}><Button className={Classes.MINIMAL} icon="book" text="Wiki" /></Link>
                <NavbarDivider />
                <Link className="bp3-button-text" to={"/about"}><Button className={Classes.MINIMAL} icon="info-sign" text="About" /></Link>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Button className={Classes.MINIMAL} onClick={this.props.toggleDarkMode} icon={"contrast"} />
            </NavbarGroup>
        </Navbar>
    }
}