import InfectionEntry, {Category, sumInfectionEntries} from "./InfectionEntry";
import HistoricalInfectionEntry from "./HistoricalInfectionEntry";

/*
 * The class containing all of the data from the server
 */
export default class InfectionData {
    entries: InfectionEntry[] = [];
    historicalEntries: HistoricalInfectionEntry[] = [];

    constructor(entries: InfectionEntry[], historicalEntries: HistoricalInfectionEntry[]) {
        this.entries = entries;
        this.historicalEntries = historicalEntries;
    }

    // Gets all of the infections with no specific region assocaited with it
    getInfections(): InfectionEntry[] {
        return this.entries.filter((entry) => {
            return entry.category === undefined
        })
    }

    getAllInfections(): InfectionEntry[] {
        return this.entries
    }

    getGlobalInfections(): InfectionEntry {
        let entry = sumInfectionEntries(this.getInfections());
        entry.region = "Globally";
        return entry;
    }

    getInfectionsByCategory(category: Category): InfectionEntry[] {
        return this.getAllInfections().filter(value => {return value.category === category})
    }

    getCategories(): Category[] {
        let categories: Category[] = [];
        this.getAllInfections().forEach(value => {
            if(value.category) {
                categories.push(value.category);
            }
        });
        return Array.from(new Set(categories));     // Remove duplicates
    }

    static fromJson(json: any): InfectionData {
        if(json['error']) {
            throw new Error(json['error'])
        }

        let entries: InfectionEntry[] = [];
        let historicalEntries: HistoricalInfectionEntry[] = [];

        json['entries'].forEach((item: any) => {
            entries.push(new InfectionEntry(item.region,
                parseInt(item.infections),
                parseInt(item.dead),
                parseInt(item.recovered),
                item.category,
                item['criticalCases'] ? parseInt(item.criticalCases) : undefined,
                item['newCases'] ? parseInt(item.newCases) : undefined,
                item['newDeaths'] ? parseInt(item.newDeaths) : undefined,
                item['casesPer1M'] ? parseInt(item.casesPer1M) : undefined,
                item['deathsPer1M'] ? parseInt(item.deathsPer1M) : undefined,
                ))
        });
        json['historicalEntries'].forEach((entry: any) => {
            historicalEntries.push(HistoricalInfectionEntry.fromJson(entry));
        });

        return new InfectionData(entries, historicalEntries);
    }
}

