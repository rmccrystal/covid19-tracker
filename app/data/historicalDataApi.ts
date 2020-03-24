import axios from "axios";
import parse from "csv-parse/lib/sync";
import InfectionEntry from "../../frontend/src/data/InfectionEntry";

export class HistoricalInfectionData {
    //lastUpdated: Date
    private records: RegionRecord[];

    constructor(records: RegionRecord[]) {
        this.records = records;
    }

    /*
     * The next three functions: getAllEntries, getStateEntries and getCountryEntries
     * essentially give the depth of the data request. getAllEntries gets all of the data,
     * getStateEntries gets all of the data excluding cities, and getCountryEntries gets
     * the data excluding both states and cities
     */

    // Gets all of the latest region records
    getAllEntries(): InfectionEntry[] {
        var entries: InfectionEntry[] = [];
        this.records.forEach(record => {
            entries.push(record.getLatestEntry())
        });

        return entries;
    }

    // Gets every region record except city level records
    // We won't be displaying city level data as of now
    // TODO: Implement city level data
    getStateEntries(): InfectionEntry[] {
        return this.getAllEntries().filter(entry => {
            return entry.city === undefined;        // Return all of the entries where city is undefined
        })
    }

    getCountryEntries(): InfectionEntry[] {
        var entries: InfectionEntry[] = [];

        // countryEntries is a map of countries and associated entries from every state
        // We need to sum the entries for every state to get the country level data.
        var countryEntries: Map<string, Array<InfectionEntry>> = new Map<string, Array<InfectionEntry>>();

        /*
         * If there is no state associated with the entry, we can safely assume
         * that the country accounts for the entire country.
         * If there is a state associated with the entry, sum all
         * of the entries from that state
         */
        this.getStateEntries().forEach(entry => {
            if(entry.state === undefined) {
                entries.push(entry);
                return
            }

            // If we don't already have something in the array for this country
            if(countryEntries.get(entry.country) === undefined) {
                countryEntries.set(entry.country, [entry])
            } else {
                // Else, append the entry to the map
                countryEntries.set(
                    entry.country,
                    countryEntries.get(entry.country).concat([entry])
                )
            }
        });

        // Sum every entry for countryEntries and add the final result to entries

        // Iterate through every country
        for(let country of countryEntries.keys()) {
            // Make a new variable that we can add new infections to
            let newInfectionEntry: InfectionEntry = new InfectionEntry(country, 0, 0, 0);
            countryEntries.get(country).forEach((entry) => {
                // Loop over every infection entry for country `country`
                // Add the data from the state level entry to the newInfectionEntry
                newInfectionEntry.infections += entry.infections;
                newInfectionEntry.dead += entry.dead;
                newInfectionEntry.recovered += entry.recovered;
            });

            entries.push(newInfectionEntry);
        }

        return entries
    }
}

/*
 * Raw data for a specific region
 * Contains the lat and long for the region,
 * the province or state if any and a list of
 * dates and the number of infections for each date
 */
export class RegionRecord {
    city: string | undefined;   // Some entries are formatted City,State. We need to separate these
                                // Note that there are entries for the city and the corresponding state
                                // need to be separated
    state: string | undefined;  // ex: `Hawaii` or `Hubei` or `Diamond Princess`
                                // Note: state is the two letter code if it corresponds with a city
                                // or the actual state name if it doesn't
    country: string;            // ex: `US` or `Cruise Ship`
    lat: number;
    long: number;

    confirmed: Map<Date, number>;   // A map of dates and the amount of new cases on that date
    deaths: Map<Date, number>;      // Same thing here but for deaths
    recoveries: Map<Date, number>;  //

    latestDate: Date;       // The latest date containing data. Used to get the latest statistics

    constructor(city: string | undefined, state: string | undefined, country: string, lat: number, long: number, confirmed: Map<Date, number>, deaths: Map<Date, number>, recoveries: Map<Date, number>, latestDate: Date) {
        this.city = city == '' ? undefined : city;      // If there is no string for city set it to undefined
        this.state = state == '' ? undefined : state;   // same thing here
        this.country = country;
        this.lat = lat;
        this.long = long;
        this.confirmed = confirmed;
        this.deaths = deaths;
        this.recoveries = recoveries;
        this.latestDate = latestDate;
    }

    getEntryByDate(date: Date): InfectionEntry {
        if(this.confirmed.get(date) === undefined) {
            throw new Error("no entries for that date");
        }

        return new InfectionEntry(
            this.country,
            this.confirmed.get(date),
            this.deaths.get(date),
            this.recoveries.get(date),
            undefined,
            this.city,
            this.state
        )
    }

    // Gets the most recent infection entry
    getLatestEntry(): InfectionEntry {
        return this.getEntryByDate(this.latestDate);
    }
}

const CONFIRMED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv"
const DEATHS_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv";
const RECOVERED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv";

/*
 * Returns a list of RegionData entries gathered from
 * three files in https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series
 */
export async function getLatestData(): Promise<HistoricalInfectionData> {
    let [confirmedResp, deathsResp, recoveredResp] = await Promise.all([
        axios.get(CONFIRMED_URL),
        axios.get(DEATHS_URL),
        axios.get(RECOVERED_URL)
    ]); // Get all three data points

    // if there is any errors getting the data
    if(confirmedResp.status != 200 || confirmedResp.status != 200 || confirmedResp.status != 200) {
        throw new Error("non 200 response code from github");
    }

    const confirmedCsv = confirmedResp.data;
    const deathsCsv = deathsResp.data;
    const recoveredCsv = recoveredResp.data;

    const confirmedObj: Array<object> = parse(confirmedCsv, {columns: true, skip_empty_lines: true});
    const deathsObj: Array<object> = parse(deathsCsv, {columns: true, skip_empty_lines: true});
    const recoveredObj: Array<object> = parse(recoveredCsv, {columns: true, skip_empty_lines: true});

    let records: RegionRecord[] = [];

    // Iterate through every confirmed case, grab the corresponding
    // deaths and recovered and add them to the list of records

    confirmedObj.forEach((value, index) => {
        // Get all date keys so we can use them to get data
        let keys: string[] = Object.keys(value);
        let dateKeys: string[] = keys.filter((key) => {
            return isDate(key);     // Return if the key is a date
        });

        let confirmed: Map<Date, number> = new Map();
        let deaths: Map<Date, number> = new Map();
        let recovered: Map<Date, number> = new Map();

        // This variable will contain the latest date for this entry
        // so we can get the most recent statistics.
        let latestDate: Date = new Date();

        // For every date key, add the data
        dateKeys.forEach((dateStr) => {
            let date = getDate(dateStr);
            confirmed.set(date, parseInt(confirmedObj[index][dateStr]));  // Set the data for the current index and date
            deaths.set(date, parseInt(deathsObj[index][dateStr]));        //
            recovered.set(date, parseInt(recoveredObj[index][dateStr]));  //
            // Set the latest date. This will run last so the var should contain the latest
            latestDate = date;
        });

        let city: string | undefined = undefined;
        let state: string | undefined = value["Province/State"];

        // If the state is defined and has a comma in it, set the city to what is before the comma
        if(state != undefined && state.split(',').length == 2) {
            let split = state.split(' ,');
            city = split[0];        // The city is the first element of the split
            state = split[1];       // The state is the second element.
        }

        records.push(new RegionRecord(
            city,
            state,
            value["Country/Region"],
            value["Lat"],
            value["Long"],
            confirmed,
            deaths,
            recovered,
            latestDate
        ))
    });

    return new HistoricalInfectionData(records);
}

function isDate(text: string): boolean {
    // The dates are formatted m/d/yy so splitting it with `/` should give us a list of length 3
    let split = text.split("/");
    if(split.length != 3) {
        return false
    }

    let month = parseInt(split[0]);
    let day = parseInt(split[1]);
    let year = parseInt(split[2]);

    // If any of these fields are not numbers, return false
    if(isNaN(month)) { return false; }
    if(isNaN(day)) { return false; }
    if(isNaN(year)) { return false; }

    if(month > 12) { return false; }
    if(day > 31) { return false; }
    if(year > 25) { return false; }     // we shouldn't expect to get years after 2025. at least hopefully not...

    return true;
}

function getDate(date: string): Date {
    if(!isDate(date)) {
        throw new Error("could not parse date");
    }
    let split = date.split("/");

    let month = parseInt(split[0]);
    let day = parseInt(split[1]);
    let year = parseInt(split[2]) + 2000;

    return new Date(year, month, day);
}