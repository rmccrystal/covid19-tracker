import InfectionEntry, {Continent, sumInfectionEntries} from "./InfectionEntry";
import {InfectionData} from "./backend";

export function getAllInfections(): InfectionEntry[] {
    return InfectionData;
}

export function getGlobalInfections(): InfectionEntry {
    let entry = sumInfectionEntries(getAllInfections());
    entry.region = "Global";
    return entry;
}

export function getInfectionsFromContinent(continent: Continent): InfectionEntry[] {
    return getAllInfections().filter(value => {return value.continent == continent})
}

export function getContinents(): Continent[] {
    let continents: Continent[] = [];
    getAllInfections().forEach(value => {
        if(value.continent) {
            continents.push(value.continent);
        }
    });
    return Array.from(new Set(continents));     // Remove duplicates
}