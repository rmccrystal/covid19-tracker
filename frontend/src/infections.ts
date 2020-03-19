export class InfectionEntry {
    region: string;
    infections: number;
    dead: number;
    recovered: number;
    get active(): number {      // Gets the number of active cases by subtracting the recovered from the infections
        return this.infections - this.recovered;
    }

    constructor(region: string, infections: number, dead: number, recovered: number) {
        this.region = region;
        this.infections = infections;
        this.dead = dead;
        this.recovered = recovered;
    }
}

export function GetInfections(): InfectionEntry[] {
    return [new InfectionEntry("United States", 100, 10, 50), new InfectionEntry("Europe", 1000, 42, 523)]
}