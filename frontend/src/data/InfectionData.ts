import InfectionEntry, {Continent, sumInfectionEntries} from "./InfectionEntry";
import axios from "axios";

/*
 * The class containing all of the data from the server
 */
export default class InfectionData {
    entries: InfectionEntry[] = [];

    constructor(entries: InfectionEntry[]) {
        this.entries = entries;
    }

    getAllInfections(): InfectionEntry[] {
        return this.entries
    }

    getGlobalInfections(): InfectionEntry {
        let entry = sumInfectionEntries(this.getAllInfections());
        entry.country = "Global";
        return entry;
    }

    getInfectionsByContinent(continent: Continent): InfectionEntry[] {
        return this.getAllInfections().filter(value => {return value.continent === continent})
    }

    getContinents(): Continent[] {
        let continents: Continent[] = [];
        this.getAllInfections().forEach(value => {
            if(value.continent) {
                continents.push(value.continent);
            }
        });
        return Array.from(new Set(continents));     // Remove duplicates
    }
}

export async function getDataFromServer(): Promise<InfectionData> {
    let resp = await axios.post("/api/getInfectionData");
    console.log(resp);
    if(resp.status !== 200) {    // if we get an error
        throw new Error("Could not connect to data API");
    }

    if(resp.data['error']) {
        throw new Error(resp.data['error'])
    }

    // TODO: deserialize data without doing this
    // FIXME: If we change any of these types this will break!
    let entries: InfectionEntry[] = [];

    resp.data.entries.forEach((item: any) => {
        entries.push(new InfectionEntry(item.country, parseInt(item.infections), parseInt(item.dead), parseInt(item.recovered)))
    });
    return new InfectionData(entries);
}
