import axios from "axios";
import InfectionData from "../shared/InfectionData";
import InfectionEntry from "../shared/InfectionEntry";

export async function getDataFromServer(): Promise<InfectionData> {
    let resp = await axios.post("/api/getInfectionData");
    console.log(resp);
    if(resp.status !== 200) {    // if we get an error
        throw new Error("Could not connect to data API");
    }

    return InfectionData.fromJson(resp.data);
}
