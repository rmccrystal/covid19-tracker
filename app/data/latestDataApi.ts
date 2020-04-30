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
        if(entry['Country'] == "World") {
            return
        }
        if(entry['Country'] == 'USA') {
            console.log(entry);
        }
        entries.push(new InfectionEntry(
            entry['Country'],
            parseInt(entry['TotalCases']) ? parseInt(entry['TotalCases'].replace(/,/g, '')) : 0,
            parseInt(entry['TotalDeaths']) ? parseInt(entry['TotalDeaths'].replace(/,/g, '')) : 0,
            parseInt(entry['TotalRecovered']) ? parseInt(entry['TotalRecovered'].replace(/,/g, '')) : 0,
            undefined,
            parseInt(entry['Serious_Critical']) ? parseInt(entry['Serious_Critical'].replace(/,/g, '')) : undefined,
            parseInt(entry['NewCases']) ? parseInt(entry['NewCases'].replace(/,/g, '')) : undefined,
            parseInt(entry['NewDeaths']) ? parseInt(entry['NewDeaths'].replace(/,/g, '')) : undefined,
            parseInt(entry['TotCases_1M_Pop']) ? parseInt(entry['TotCases_1M_Pop'].replace(/,/g, '')) : undefined,
            parseInt(entry['Deaths/1M pop']) ? parseInt(entry['Deaths/1M pop'].replace(/,/g, '')) : undefined,
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
        if(entry['USAState'] == 'USA Total') {
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
            "United States",
            undefined,
            entry['NewCases'] ? parseInt(entry['NewCases'].replace(',', '')) : undefined,
            entry['NewDeaths'] ? parseInt(entry['NewDeaths'].replace(',', '')) : undefined,
            entry['Tot Cases/1M pop'] ? parseInt(entry['Tot Cases/1M pop'].replace(',', '')) : undefined,
            entry['Deaths/1M pop'] ? parseInt(entry['Deaths/1M pop'].replace(',', '')) : undefined,
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
