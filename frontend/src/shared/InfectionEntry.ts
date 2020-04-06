import IInfectionEntry from "./IInfectionEntry";

export type Category = string;

export default class InfectionEntry implements IInfectionEntry {
    category?: Category;
    region: string;
    infections: number;
    dead: number;
    recovered: number;
    criticalCases?: number;

    newCases?: number;
    newDeaths?: number;
    casesPer1M?: number;
    deathsPer1M?: number;

    get active(): number {      // Gets the number of active cases by subtracting the recovered from the infections
        return this.infections - this.recovered;
    }

    constructor(
        region: string,
        infections: number,
        dead: number,
        recovered: number,
        category?: Category,
        criticalCases?: number,
        newCases?: number,
        newDeaths?: number,
        casesPer1M?: number,
        deathsPer1M?: number
    ) {
        this.category = category;
        this.region = region;
        this.infections = infections;
        this.dead = dead;
        this.recovered = recovered;
        this.criticalCases = criticalCases;
        this.newCases = newCases;
        this.newDeaths = newDeaths;
        this.casesPer1M = casesPer1M;
        this.deathsPer1M = deathsPer1M;
    }

    // These string functions return the number with commas
    infectionsString(): string {
        return this.infections.toLocaleString();
    }

    deadString(): string {
        return this.dead.toLocaleString();
    }

    recoveredString(): string {
        return this.recovered.toLocaleString();
    }

    activeString(): string {
        return this.active.toLocaleString();
    }

    getDeathPercentage(): number {
        return Math.round((this.dead / this.infections) * 1000) / 10        // the / 10 and the * 1000 rounds the percentage to one decimal place
    }

    getRecoveryPercentage(): number {
        return Math.round((this.recovered / this.infections) * 1000) / 10
    }
}

// Sums the data from a list of infection entries.
// Useful for finding global infections
export function sumInfectionEntries(entries: InfectionEntry[]): InfectionEntry {
    return entries.reduce((previousValue, currentValue) => {
            return new InfectionEntry(previousValue.region,
                previousValue.infections + currentValue.infections,
                previousValue.dead + currentValue.dead,
                previousValue.recovered + currentValue.recovered,
                previousValue.category)
        },
        new InfectionEntry("", 0, 0, 0));
}
