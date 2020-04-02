import InfectionEntry from "../../frontend/src/shared/InfectionEntry";
import {getLatestUSRecords} from "./historicalDataApi";
const api = require("covid19-api");

// Gets all entries with the global, us, or european labels according
export async function getAllEntries(): Promise<InfectionEntry[]> {
    let globalEntries = await getGlobalEntries();
    let usEntries = await getUSEntries();
    let usCountyEntries = await getUSCountyEntries();
    return globalEntries.concat(usEntries, usCountyEntries);
}

async function getGlobalEntries(): Promise<InfectionEntry[]> {
    let entries: InfectionEntry[] = [];

    const reportsObj = await api.getReports();
    const table = reportsObj[0][0]['table'][0];
    table.forEach(entry => {
        if(entry['Country'] == "Total:") {
            return
        }
        entries.push(new InfectionEntry(
            entry['Country'],
            entry['TotalCases'] ? parseInt(entry['TotalCases'].replace(',', '')) : 0,
            entry['TotalDeaths'] ? parseInt(entry['TotalDeaths'].replace(',', '')) : 0,
            entry['TotalRecovered'] ? parseInt(entry['TotalRecovered'].replace(',', '')) : 0
        ));
    });

    return entries.sort((a, b) => {
        if (a.infections > b.infections) {
            return -1;
        }
        if (a.infections < b.infections) {
            return 1;
        }
        return 0;
    })
}

async function getUSEntries(): Promise<InfectionEntry[]> {
    let entries: InfectionEntry[] = [];

    const reportsObj = await api.getCasesInAllUSStates();
    const table = reportsObj[0][0]['table'];
    table.forEach(entry => {
        if(entry['USAState'] == "Total:") {
            return
        }

        let active = entry['ActiveCases'] ? parseInt(entry['ActiveCases'].replace(',', '')) : 0;
        let infections = entry['TotalCases'] ? parseInt(entry['TotalCases'].replace(',', '')) : 0;
        let recovered = infections - active;
        let dead = entry['TotalDeaths'] ? parseInt(entry['TotalDeaths'].replace(',', '')) : 0;
        entries.push(new InfectionEntry(
            entry['USAState'],
            infections,
            dead,
            recovered,
            "United States"
        ));
    });

    return entries.sort((a, b) => {
        if (a.infections > b.infections) {
            return -1;
        }
        if (a.infections < b.infections) {
            return 1;
        }
        return 0;
    })
}

async function getUSCountyEntries(): Promise<InfectionEntry[]> {
    let usRecords = await getLatestUSRecords();
    let entries = usRecords.map(record => {
        let region;
        if(record.city) {
            region = `${record.city}, ${record.state}`;
        } else {
            region = `${record.state}`;
        }
        let entry = record.getLatestEntry();
        entry.region = region;
        entry.category = "United States (By County)";
        return entry;
    });

    return entries.sort((a, b) => {
        if (a.infections > b.infections) {
            return -1;
        }
        if (a.infections < b.infections) {
            return 1;
        }
        return 0;
    })
}