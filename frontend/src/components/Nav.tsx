import React, {Component, MouseEventHandler} from "react";
import {Navbar, NavDropdown, Nav as BootstrapNav} from "react-bootstrap";
import {Button, Classes, Divider, H3} from "@blueprintjs/core";
import {Link} from "react-router-dom";

import "./Nav.scss"

interface NavProps {
    title: string;
    toggleDarkMode: MouseEventHandler;
    darkMode: boolean;
}

export default class Nav extends Component<NavProps> {
    render() {
        return (
            <Navbar className="page-navbar" expand="lg">
                <Navbar.Brand><H3>{this.props.title}</H3></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <BootstrapNav className="mr-auto">
                        <Link className="bp3-button-text" to={"/"}><Button className={Classes.MINIMAL} icon="home" text="Home"/></Link>
                        <Link className="bp3-button-text" to={"/wiki"}><Button className={Classes.MINIMAL} icon="book" text="Wiki" /></Link>
                        <Link className="bp3-button-text" to={"/map"}><Button className={Classes.MINIMAL} icon="map" text="Map" /></Link>
                        <Link className="bp3-button-text" to={"/projections"}><Button className={Classes.MINIMAL} icon="timeline-area-chart" text="Projections" /></Link>
                        <Divider />
                        <Link className="bp3-button-text" to={"/about"}><Button className={Classes.MINIMAL} icon="info-sign" text="About" /></Link>
                    </BootstrapNav>
                    <BootstrapNav className="navbar-right">
                        <Button className={Classes.MINIMAL} onClick={this.props.toggleDarkMode} icon={"contrast"}>Toggle dark mode</Button>
                    </BootstrapNav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


