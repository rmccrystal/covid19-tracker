import InfectionEntry from "../../frontend/src/shared/InfectionEntry";
const api = require("covid19-api");

// Gets all entries with the global, us, or european labels according
export async function getAllEntries(): Promise<InfectionEntry[]> {
    let globalEntries = await getGlobalEntries();
    let usEntries = await getUSEntries();
    return globalEntries.concat(usEntries);
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
        entries.push(new InfectionEntry(
            entry['USAState'],
            entry['TotalCases'] ? parseInt(entry['TotalCases'].replace(',', '')) : 0,
            entry['TotalDeaths'] ? parseInt(entry['TotalDeaths'].replace(',', '')) : 0,
            entry['TotalRecovered'] ? parseInt(entry['TotalRecovered'].replace(',', '')) : 0,
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