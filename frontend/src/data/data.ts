import InfectionEntry, {Continent, sumInfectionEntries} from "./InfectionEntry";

export function getAllInfections(): InfectionEntry[] {
    return [new InfectionEntry("United States", 100, 10, 50, "North America"),
        new InfectionEntry("France", 1000, 42, 523, "Europe")]
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