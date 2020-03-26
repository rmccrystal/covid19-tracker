import InfectionEntry from "../../frontend/src/shared/InfectionEntry";
const api = require("covid19-api");

// Gets all entries with the global, us, or european labels according
export async function getAllEntries(): Promise<InfectionEntry[]> {
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

    return entries
}