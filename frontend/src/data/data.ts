import InfectionEntry, {Continent} from "./InfectionEntry";

export function getAllInfections(): InfectionEntry[] {
    return [new InfectionEntry("United States", 100, 10, 50, "North America"),
        new InfectionEntry("France", 1000, 42, 523, "Europe")]
}

export function getInfectionsFromContinent(continent: Continent): InfectionEntry[] {
    return getAllInfections().filter(value => {return value.continent == continent})
}

export function getContinents(): Continent[] {
    let continents: Continent[] = [];
    getAllInfections().forEach(value => {continents.push(value.continent)});
    continents = continents.filter((value => {return value !== undefined}));    // Filter out undefined from our array
    return Array.from(new Set(continents));     // Remove duplicates
}