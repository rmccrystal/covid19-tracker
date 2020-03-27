import React, {Component} from "react";

import "./LoadingScreen.scss"

import {H4, Spinner} from "@blueprintjs/core";

interface LoadingScreenProps {
    text?: string
}

export default class LoadingScreen extends Component<LoadingScreenProps> {
    render() {
        return (
            <div>
                <div className="loading-screen-container mt-5">
                    <Spinner size={60}/>

                    <H4 muted className="mt-2 loading-text">{this.props.text}</H4>
                </div>
            </div>
        )
    }
}
