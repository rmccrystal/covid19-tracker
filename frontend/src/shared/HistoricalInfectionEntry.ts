import IInfectionEntry from "./IInfectionEntry";

export default class HistoricalInfectionEntry implements IInfectionEntry {
    region: string;
    infections: Array<[number, number]>;        // {daysSinceFirstCase, infections}
    dead: Array<[number, number]>;              // {daysSinceFirstCase, dead}
    recovered: Array<[number, number]>;         // {daysSinceFirstCase, recovered}
    firstCase: Date;    // undefined if no cases

    constructor(region: string, infections: Array<{ daysSinceFirstCase: number; infections: number }>, dead: Array<{ daysSinceFirstCase: number; dead: number }>, recovered: Array<{ daysSinceFirstCase: number; recovered: number }>, firstCase: Date) {
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
        let entry = new HistoricalInfectionEntry(json['region'], [], [], [], new Date(json['firstCase']));
        entry.infections = json['infections'];
        entry.dead = json['dead'];
        entry.recovered = json['recovered'];
        return entry;
    }

    getDaysSinceFirstCase(): number {
        if (!this.firstCase) return 0;
        return getDateDifferenceInDays(this.firstCase, new Date());
    }

    getLatestDaysSinceFirstCase(): number {
        let latestDay: number = 0;
        this.infections.forEach((entry) => {
            if (entry[0] > latestDay) {
                latestDay = entry[0];
            }
        });
        return latestDay
    }

    getLatestInfections(): number {
        let latestDay: number = 0;
        let latestCount: number = 0;
        this.infections.forEach((entry) => {
            if (entry[0] > latestDay) {
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
            if (entry[0] > latestDay) {
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
            if (entry[0] > latestDay) {
                latestDay = entry[0];
                latestCount = entry[1];
            }
        });
        return latestCount
    }

    // IMPORTANT NOTE: This function only works if the the two entries start on the same day
    add(otherEntry: HistoricalInfectionEntry): HistoricalInfectionEntry {
        // 'earlier' and 'later' refer to when the first case was
        let earlierEntry = this.firstCase > otherEntry.firstCase ? otherEntry : this;
        let laterEntry = this.firstCase <= otherEntry.firstCase ? otherEntry : this;

        // Offset whichever case is later to align with the other entry
        let offset = getDateDifferenceInDays(earlierEntry.firstCase, laterEntry.firstCase);
        laterEntry.infections = laterEntry.infections.map(value => {
            value[0] += offset;
            return value;
        });
        laterEntry.dead = laterEntry.dead.map(value => {
            value[0] += offset;
            return value;
        });
        laterEntry.recovered = laterEntry.recovered.map(value => {
            value[0] += offset;
            return value;
        });

        // Set the amount to zero in laterEntry for all entries in earlierEntry but not in laterEntry
        earlierEntry.infections.reverse().forEach(value => {
            // If there no entries in the later entry with the same daysSinceFirstCase as the earlier entry
            if(laterEntry.infections.filter(value1 => value1[0] == value[0]).length == 0) {
                // Push zero to x number of days after first infection
                laterEntry.infections.unshift([value[0], 0]);
            }
        });
        earlierEntry.dead.reverse().forEach(value => {
            // If there no entries in the later entry with the same daysSinceFirstCase as the earlier entry
            if(laterEntry.dead.filter(value1 => value1[0] == value[0]).length == 0) {
                // Push zero to x number of days after first infection
                laterEntry.dead.unshift([value[0], 0]);
            }
        });
        earlierEntry.recovered.reverse().forEach(value => {
            // If there no entries in the later entry with the same daysSinceFirstCase as the earlier entry
            if(laterEntry.recovered.filter(value1 => value1[0] == value[0]).length == 0) {
                // Push zero to x number of days after first infection
                laterEntry.recovered.unshift([value[0], 0]);
            }
        });

        // For every infection, find the corresponding infection on the other entry and add them
        let newInfections = earlierEntry.infections.reverse().map(earlierInfection => {
            // Get the corresponding entry from the other entry
            return {
                daysSinceFirstCase: earlierInfection[0],
                infections: laterEntry.infections.filter(otherInfection => otherInfection[0] == earlierInfection[0])[0][1] + earlierInfection[1]
            };
        });
        let newDeaths = earlierEntry.dead.reverse().map(earlierDeaths => {
            // Get the corresponding entry from the other entry
            return {
                daysSinceFirstCase: earlierDeaths[0],
                dead: laterEntry.dead.filter(otherDeaths => otherDeaths[0] == earlierDeaths[0])[0][1] + earlierDeaths[1]
            };
        });
        let newRecoveries = earlierEntry.recovered.reverse().map(earlierRecovered => {
            // Get the corresponding entry from the other entry
            return {
                daysSinceFirstCase: earlierRecovered[0],
                recovered: laterEntry.recovered.filter(otherRecovered => otherRecovered[0] == earlierRecovered[0])[0][1] + earlierRecovered[1]
            };
        });
        return new HistoricalInfectionEntry(
            this.region,
            newInfections,
            newDeaths,
            newRecoveries,
            earlierEntry.firstCase
        )
    }
}

// earlier date first
function getDateDifferenceInDays(dt1: Date, dt2: Date) {
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}