import axios from "axios";
import InfectionData from "../shared/InfectionData";
import InfectionEntry from "../shared/InfectionEntry";

export async function getDataFromServer(): Promise<InfectionData> {
    return new InfectionData([
        new InfectionEntry("United States", 100, 10, 50),
        new InfectionEntry("France", 1000, 42, 77),
        new InfectionEntry("asddf", 532, 12, 76),
        new InfectionEntry("asdasdf", 532, 12, 76),
        new InfectionEntry("q", 532, 12, 76),
        new InfectionEntry("dabasdf", 532, 12, 76),
        new InfectionEntry("asdadf", 532, 12, 76),
        new InfectionEntry("adsdf", 532, 12, 76),
        new InfectionEntry("aeqqsdf", 532, 12, 76),
        new InfectionEntry("asedf", 532, 12, 76),
        new InfectionEntry("aseeeedf", 532, 12, 76),
        new InfectionEntry("asqedf", 532, 12, 76),
        new InfectionEntry("azzsdf", 532, 12, 76),
        new InfectionEntry("asdxf", 532, 12, 76),
        new InfectionEntry("ascdf", 532, 12, 76),
        new InfectionEntry("asvdf", 532, 12, 76),
        new InfectionEntry("asbdf", 532, 12, 76),
        new InfectionEntry("asndf", 532, 12, 76),
        new InfectionEntry("asdmf", 532, 12, 76),
        new InfectionEntry("ajsdf", 532, 12, 76),
        new InfectionEntry("asdrwf", 532, 12, 76),
        new InfectionEntry("tre", 12312, 3, 5675)]);
    let resp = await axios.post("/api/getInfectionData");
    console.log(resp);
    if(resp.status !== 200) {    // if we get an error
        throw new Error("Could not connect to data API");
    }

    return InfectionData.fromJson(resp.data);
}
