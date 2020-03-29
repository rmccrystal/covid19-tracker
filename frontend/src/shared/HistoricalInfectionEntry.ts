export default class HistoricalInfectionEntry {
    region: string;
    infections: Array<[number, number]>;        // {daysSinceFirstCase, infections}
    dead: Array<[number, number]>;              // {daysSinceFirstCase, dead}
    recovered: Array<[number, number]>;         // {daysSinceFirstCase, recovered}
    firstCase: Date | undefined;    // undefined if no cases

    constructor(region: string, infections: Array<{ daysSinceFirstCase: number; infections: number }>, dead: Array<{ daysSinceFirstCase: number; dead: number }>, recovered: Array<{ daysSinceFirstCase: number; recovered: number }>, firstCase: Date | undefined) {
        this.region = region;
        // @ts-ignore       // Turn the objects into an array of length 2
        this.infections = infections.map(n => Object.values(n));
        // @ts-ignore
        this.dead = dead.map(n => Object.values(n));
        // @ts-ignore
        this.recovered = recovered.map(n => Object.values(n));
        this.firstCase = firstCase;
    }

    static fromJson(json: any): HistoricalInfectionEntry {
        let entry = new HistoricalInfectionEntry(json['region'], [], [], [],
            json['firstCase'] ? new Date(json['firstCase']) : undefined);
        entry.infections = json['infections'];
        entry.dead = json['dead'];
        entry.recovered = json['recovered'];
        return entry;
    }
}