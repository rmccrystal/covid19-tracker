import InfectionEntry, {Category, sumInfectionEntries} from "./InfectionEntry";

/*
 * The class containing all of the data from the server
 */
export default class InfectionData {
    entries: InfectionEntry[] = [];

    constructor(entries: InfectionEntry[]) {
        this.entries = entries;
    }

    // Gets all of the infections with no specific region assocaited with it
    getInfections(): InfectionEntry[] {
        return this.entries.filter((entry) => {
            return entry.category == undefined
        })
    }

    getAllInfections(): InfectionEntry[] {
        return this.entries
    }

    getGlobalInfections(): InfectionEntry {
        let entry = sumInfectionEntries(this.getInfections());
        entry.region = "Global";
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

        json['entries'].forEach((item: any) => {
            entries.push(new InfectionEntry(item.region, parseInt(item.infections), parseInt(item.dead), parseInt(item.recovered), item.category))
        });
        return new InfectionData(entries);
    }
}

