import IInfectionEntry from "./IInfectionEntry";

export default class HistoricalInfectionEntry implements IInfectionEntry {
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

    getDaysSinceFirstCase(): number {
        if(!this.firstCase) return 0;
        return getDateDifferenceInDays(this.firstCase, new Date());
    }

    getLatestInfections(): number {
        let latestDay: number = 0;
        let latestCount: number = 0;
        this.infections.forEach((entry) => {
            if(entry[0] > latestDay) {
                latestDay = entry[0];
                latestCount = entry[1];
            }
        });
        return latestCount
    }

    getLatestDeaths(): number {
        let latestDay: number = 0;
        let latestCount: number = 0;
        this.dead.forEach((entry) => {
            if(entry[0] > latestDay) {
                latestDay = entry[0];
                latestCount = entry[1];
            }
        });
        return latestCount
    }

    getLatestRecoveries(): number {
        let latestDay: number = 0;
        let latestCount: number = 0;
        this.recovered.forEach((entry) => {
            if(entry[0] > latestDay) {
                latestDay = entry[0];
                latestCount = entry[1];
            }
        });
        return latestCount
    }
}

// earlier date first
function getDateDifferenceInDays(dt1: Date, dt2: Date) {
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}