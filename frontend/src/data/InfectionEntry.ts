export default class InfectionEntry {
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

    getDeathPercentage(): number {
        return Math.round((this.dead/this.infections)*100)
    }

    getRecoveryPercentage(): number {
        return Math.round((this.recovered/this.infections)*100)
    }
}