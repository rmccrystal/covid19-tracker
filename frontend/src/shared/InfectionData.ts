import InfectionEntry, {Category, sumInfectionEntries} from "./InfectionEntry";

/*
 * The class containing all of the data from the server
 */
export default class InfectionData {
    entries: InfectionEntry[] = [];

    constructor(entries: InfectionEntry[]) {
        this.entries = entries;
    }

    getAllInfections(): InfectionEntry[] {
        return this.entries
    }

    getGlobalInfections(): InfectionEntry {
        let entry = sumInfectionEntries(this.getAllInfections());
        entry.country = "Global";
        return entry;
    }

    getInfectionsByCategory(category: Category): InfectionEntry[] {
        return this.getAllInfections().filter(value => {return value.category === category})
    }

    getCategories(): Category[] {
        let continents: Category[] = [];
        this.getAllInfections().forEach(value => {
            if(value.category) {
                continents.push(value.category);
            }
        });
        return Array.from(new Set(continents));     // Remove duplicates
    }

    static fromJson(json: any): InfectionData {
        if(json['error']) {
            throw new Error(json['error'])
        }

        let entries: InfectionEntry[] = [];

        json['entries'].forEach((item: any) => {
            entries.push(new InfectionEntry(item.country, parseInt(item.infections), parseInt(item.dead), parseInt(item.recovered)))
        });
        return new InfectionData(entries);
    }
}

