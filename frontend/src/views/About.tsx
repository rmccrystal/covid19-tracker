import React, {Component} from 'react';
import {Card, Elevation, H1, H3} from "@blueprintjs/core";
import "./About.scss";

export default class About extends Component {
    render() {
        return (
            <div className="container mt-5 bp3-text-large about">
                <Card elevation={Elevation.FOUR} className="about-card">
                    <H1 className="text-center">About</H1>
                    <H3>Who made this site?</H3>
                    <p>This site was created by <b>Ryan McCrystal</b>, a high school Junior living in Maui, Hawaii. For
                        any questions or recommendations, email me at <a
                            href="mailto:ryan@ryanmccrystal.com">ryan@ryanmccrystal.com</a></p>
                    <br/>
                    <H3>Where is the data coming from?</H3>
                    <p>The live data on the main page is being scraped every 10 minutes from
                        <a href="https://worldometers.info"> worldometers.info</a>. As for the historical data, Johns
                        Hopkins has made available their historical Covid-19 data on their <a
                            href="https://github.com/CSSEGISandData/COVID-19">GitHub page</a></p>
                    <br/>
                    <H3>How is the data analyzed?</H3>
                    <p>The projections are calculated using an exponential regression model based on historical
                        infection data. Although the models precisely fit the current data, at some point the infection
                        growth rate will slowly decrease until the curve eventually flattens out</p>
                </Card>
            </div>
        )
    }
}
