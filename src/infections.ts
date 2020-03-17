export class InfectionEntry {
    region: string;
    infections: number;
    dead: number;
    recovered: number;

    constructor(region: string, infections: number, dead: number, recovered: number) {
        this.region = region;
        this.infections = infections;
        this.dead = dead;
        this.recovered = recovered;
    }
}

export function GetInfections(): InfectionEntry[] {
    return [new InfectionEntry("america", 100, 10, 50), new InfectionEntry("europe", 1000, 42, 523)]
}