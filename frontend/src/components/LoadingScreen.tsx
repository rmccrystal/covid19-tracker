import React, {Component} from "react";

import "./LoadingScreen.scss"

import reactSpinners from "react-spinners";
import {Spinner} from "@blueprintjs/core";

interface LoadingScreenProps {
    text?: string
}

export default class LoadingScreen extends Component<LoadingScreenProps> {
    render() {
        return (
            <div className="loadingScreenContainer">
                <Spinner size={60}/>
            </div>
        )
    }
}
