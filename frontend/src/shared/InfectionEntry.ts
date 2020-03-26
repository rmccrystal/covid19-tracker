export type Category = string;

export default class InfectionEntry {
    category?: Category;
    city?: string;
    state?: string;
    country: string;
    infections: number;
    dead: number;
    recovered: number;
    get active(): number {      // Gets the number of active cases by subtracting the recovered from the infections
        return this.infections - this.recovered;
    }

    constructor(country: string, infections: number, dead: number, recovered: number, category?: Category, city?: string, state?: string) {
        this.category = category;
        this.country = country;
        this.state = state;
        this.city = city;
        this.infections = infections;
        this.dead = dead;
        this.recovered = recovered;
    }

    getDeathPercentage(): number {
        return Math.round((this.dead/this.infections)*1000) / 10        // the / 10 and the * 1000 rounds the percentage to one decimal place
    }

    getRecoveryPercentage(): number {
        return Math.round((this.recovered/this.infections)*1000) / 10
    }
}

// Sums the data from a list of infection entries.
// Useful for finding global infections
export function sumInfectionEntries(entries: InfectionEntry[]): InfectionEntry {
    return entries.reduce((previousValue, currentValue) => {
            return new InfectionEntry(previousValue.country,
                previousValue.infections + currentValue.infections,
                previousValue.dead + currentValue.dead,
                previousValue.recovered + currentValue.recovered)},
        new InfectionEntry("", 0, 0, 0));
}