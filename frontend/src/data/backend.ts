import axios from "axios";
import InfectionEntry from "./InfectionEntry";
import {legacy} from "set-interval-async";

// The infection data cache which will be updated every 60 seconds
export var InfectionData: InfectionEntry[] = [];

// Function which will start requesting data every 60 seconds
export function startDataUpdater() {
    console.log("Data updater started");
    const update = () => {
        getInfections().then((value => InfectionData = value))
    };
    update();
    setInterval(update, 60000)
}

// Retrieves the infection data from the server
async function getInfections(): Promise<InfectionEntry[]> {
    let resp = await axios.post("/api/getInfections");
    return resp.data as InfectionEntry[];
}