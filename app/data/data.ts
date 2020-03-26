import InfectionEntry from "../../frontend/src/shared/InfectionEntry";
import InfectionData from "../../frontend/src/shared/InfectionData";
import {getAllEntries} from "./latestDataApi";

export async function getInfectionData(): Promise<InfectionData> {
    return new InfectionData(await getAllEntries())
}
