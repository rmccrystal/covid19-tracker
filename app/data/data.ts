import InfectionEntry from "../../frontend/src/shared/InfectionEntry";
import InfectionData from "../../frontend/src/shared/InfectionData";
import {getAllEntries} from "./latestDataApi";
import {getAllHistoricalEntries} from "./historicalDataApi";

export async function getInfectionData(): Promise<InfectionData> {
    return new InfectionData(await getAllEntries(), await getAllHistoricalEntries())
}
