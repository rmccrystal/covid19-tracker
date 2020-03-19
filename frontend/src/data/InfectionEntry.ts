export type Continent = "North America" | "Europe" | "Asia" | "South America" | "Africa" | "Australia";

export default class InfectionEntry {
    continent: Continent | undefined;
    region: string;
    infections: number;
    dead: number;
    recovered: number;
    get active(): number {      // Gets the number of active cases by subtracting the recovered from the infections
        return this.infections - this.recovered;
    }

    constructor(region: string, infections: number, dead: number, recovered: number, continent?: Continent) {
        this.continent = continent;
        this.region = region;
        this.infections = infections;
        this.dead = dead;
        this.recovered = recovered;
    }

    getDeathPercentage(): number {
        return Math.round((this.dead/this.infections)*100)
    }

    getRecoveryPercentage(): number {
        return Math.round((this.recovered/this.infections)*100)
    }
}

// Sums the data from a list of infection entries.
// Useful for finding global infections
export function sumInfectionEntries(entries: InfectionEntry[]): InfectionEntry {
    return entries.reduce((previousValue, currentValue) => {
            return new InfectionEntry(previousValue.region,
                previousValue.infections + currentValue.infections,
                previousValue.dead + currentValue.dead,
                previousValue.recovered + currentValue.recovered)},
        new InfectionEntry("", 0, 0, 0));
}