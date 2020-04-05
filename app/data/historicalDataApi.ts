import axios from "axios";
import parse from "csv-parse/lib/sync";
import InfectionEntry from "../../frontend/src/shared/InfectionEntry";
import HistoricalInfectionEntry from "../../frontend/src/shared/HistoricalInfectionEntry";

export async function getAllHistoricalEntries(): Promise<HistoricalInfectionEntry[]> {
    return (await getLatestData()).getAllEntries()
}

class HistoricalInfectionData {
    //lastUpdated: Date
    private records: RegionRecord[];
    private usRecords: RegionRecord[];

    constructor(records: RegionRecord[], usRecords: RegionRecord[]) {
        this.records = records;
        this.usRecords = usRecords;
    }

    /*
     * The next three functions: getAllEntries, getStateEntries and getCountryEntries
     * essentially give the depth of the data request. getAllEntries gets all of the data,
     * getStateEntries gets all of the data excluding cities, and getCountryEntries gets
     * the data excluding both states and cities
     */

    // Gets all of the latest region records
    getAllEntries(): HistoricalInfectionEntry[] {
        var entries: HistoricalInfectionEntry[] = [];
        entries.push(this.getGlobalEntry(),
            this.getEntriesOutsideChina(),
            ...this.getCountryEntries(),
            ...this.getUSStateEntries(),
            ...this.getUSCountyEntries());

        // Sort the entries
        entries = entries.sort((a, b) => a.getLatestInfections()-b.getLatestInfections());
        return entries;
    }

    getCountryEntries(): HistoricalInfectionEntry[] {
        let entries: HistoricalInfectionEntry[] = [];
        // first push all of the records without states
        this.records.forEach(record => {
            if (record.state === undefined) {
                entries.push(record.getHistoricalInfectionEntry())
            }
        });

        this.records.forEach(record => {
            // If there is no state associated with the infection entry, add it to the list
            if (record.state === undefined) {
                return
            }
            // If there is already a country entry
            if (entries.filter(entry => entry.region == record.country).length) {
                return
            }

            // If there is a state we need to get the rest of the entries with that state and sum them together
            // Get all of the entries with the same state except the current one
            let otherRecords = this.records.filter(_record => (_record.country === record.country) && (_record.state !== record.state))
            // Make the otherEntries variable only infection entries
            let otherEntries = otherRecords.map(value => {
                return value.getHistoricalInfectionEntry()
            });
            let summedEntry = otherEntries.reduce((previousValue, currentValue) => {
                return previousValue.add(currentValue)
            }, record.getHistoricalInfectionEntry());

            // Set the region name to the country
            summedEntry.region = record.country;
            entries.push(summedEntry)
        });

        return entries;
    }

    // Sums all entries
    getGlobalEntry(): HistoricalInfectionEntry {
        let entry: HistoricalInfectionEntry = undefined;
        this.records.forEach(record => {
            // If it is the first iteration of the loop, set the entry to the first element
            if (entry === undefined) {
                entry = record.getHistoricalInfectionEntry();
                entry.region = "Globally";
                return;
            }
            // Else, add the element
            entry = entry.add(record.getHistoricalInfectionEntry())
        });
        return entry;
    }

    getEntriesOutsideChina(): HistoricalInfectionEntry {
        let entry: HistoricalInfectionEntry = undefined;
        this.records.forEach(record => {
            // If the record is in China, return
            if(record.country.toLocaleLowerCase().includes("china")) {
                return
            }
            // If it is the first iteration of the loop, set the entry to the first element
            if(entry === undefined) {
                entry = record.getHistoricalInfectionEntry()
            }
            // Else, add the element
            entry = entry.add(record.getHistoricalInfectionEntry())
        });
        entry.region = "Outside China";
        return entry
    }

    // Returns entries for all of the counties in the US
    getUSCountyEntries(): HistoricalInfectionEntry[] {
        return this.usRecords.map(record => {
            return record.getHistoricalInfectionEntry()
        })
    }

    // Returns state by state data by summing all of the
    // county data for each state
    getUSStateEntries(): HistoricalInfectionEntry[] {
        // Map<state, [entry, count]>
        let entriesMap: Map<string, [HistoricalInfectionEntry, number]> = new Map<string, [HistoricalInfectionEntry, number]>();
        this.usRecords.forEach(record => {
            let entry = record.getHistoricalInfectionEntry();
            let state = record.state + ", US";
            entry.region = state;   // We want the region to be the state
            if(!entriesMap.get(state)) {        // If there is no state in the list, add it
                entriesMap.set(state, [entry, 1]);
                return;
            }
            // else get the state and add it to it
            entriesMap.set(state, [entriesMap.get(state)[0].add(entry), entriesMap.get(state)[1] + 1]);
        });

        let entries: HistoricalInfectionEntry[] = [];
        // only add entries with more than one appearances
        entriesMap.forEach((value, key) => {
            // If there is more than one occurrence, add it
            if (value[1] > 1) {
                entries.push(value[0]);
                value[1] = -1;  // Set the count of the value to -1 so we don't use it again
            }
        });


        return entries;
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

    infections: Map<Date, number>;   // A map of dates and the amount of new cases on that date
    deaths: Map<Date, number>;      // Same thing here but for deaths
    recoveries: Map<Date, number> | undefined;  // There is no recovery data for the US so it might be undefined

    latestDate: Date;       // The latest date containing data. Used to get the latest statistics
    firstInfection: Date;   // The date of the first infection

    constructor(city: string | undefined, state: string | undefined, country: string, lat: number, long: number, confirmed: Map<Date, number>, deaths: Map<Date, number>, recoveries: Map<Date, number>, latestDate: Date) {
        this.city = city == '' ? undefined : city;      // If there is no string for city set it to undefined
        this.state = state == '' ? undefined : state;   // same thing here
        this.country = country;
        this.lat = lat;
        this.long = long;
        this.infections = confirmed;
        this.deaths = deaths;
        this.recoveries = recoveries;
        this.latestDate = latestDate;

        this.firstInfection = new Date();
        this.infections.forEach(((inf, date) => {   // Loop through every infection and find the earliest one
            if (inf == 0) return;    // Skip if there are no infections
            if (date < this.firstInfection) {    // If the date is earlier than the
                this.firstInfection = date;
            }
        }))
    }

    getEntryByDate(date: Date): InfectionEntry {
        if (this.infections.get(date) === undefined) {
            throw new Error("no entries for that date");
        }

        let recoveries = 0;
        if(this.recoveries) {
            recoveries = this.recoveries.get(date);
        }

        return new InfectionEntry(
            this.country,
            this.infections.get(date),
            this.deaths.get(date),
            recoveries,
            undefined,
        )
    }

    // Gets the most recent infection entry
    getLatestEntry(): InfectionEntry {
        return this.getEntryByDate(this.latestDate);
    }

    getHistoricalInfectionEntry(): HistoricalInfectionEntry {
        let region;
        if (this.city) {
            region = `${this.city}, ${this.state}, ${this.country}`
        }        // Set the region based on the most accurate location
        else if (this.state) {
            region = `${this.state}, ${this.country}`
        } else {
            region = this.country
        }

        let infectionsArr: Array<{ daysSinceFirstCase: number, infections: number }> = [];
        let deadArr: Array<{ daysSinceFirstCase: number, dead: number }> = [];
        let recoveredArr: Array<{ daysSinceFirstCase: number, recovered: number }> = [];

        this.infections.forEach(((infections, date) => {
            if (date < this.firstInfection) return;     // return if we haven't hit the first infection yet
            infectionsArr.push({
                daysSinceFirstCase: getDateDifferenceInDays(this.firstInfection, date),
                infections: infections
            });
        }));

        this.deaths.forEach(((deaths, date) => {
            if (date < this.firstInfection) return;     // return if we haven't hit the first infection yet
            deadArr.push({daysSinceFirstCase: getDateDifferenceInDays(this.firstInfection, date), dead: deaths});
        }));

        if(this.recoveries) {
            this.recoveries.forEach(((recoveries, date) => {
                if (date < this.firstInfection) return;     // return if we haven't hit the first infection yet
                recoveredArr.push({
                    daysSinceFirstCase: getDateDifferenceInDays(this.firstInfection, date),
                    recovered: recoveries
                });
            }));
        }

        return new HistoricalInfectionEntry(region, infectionsArr, deadArr, recoveredArr, this.firstInfection);
    }
}

export async function getLatestData(): Promise<HistoricalInfectionData> {
    return new HistoricalInfectionData(await getLatestGlobalRecords(), await getLatestUSRecords())
}

const CONFIRMED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
const DEATHS_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
const RECOVERED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

/*
 * Returns a list of RegionData entries gathered from
 * three files in https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series
 */
export async function getLatestGlobalRecords(): Promise<RegionRecord[]> {
    let [confirmedResp, deathsResp, recoveredResp] = await Promise.all([
        axios.get(CONFIRMED_URL),
        axios.get(DEATHS_URL),
        axios.get(RECOVERED_URL)
    ]); // Get all three data points

    // if there is any errors getting the data
    if (confirmedResp.status != 200 || deathsResp.status != 200 || recoveredResp.status != 200) {
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

            // Recovered is misaligned with confirmed, so we have to search through the dataset
            // Get entry from the recovered list with the same region and state as this entry
            let recoveredEntries = recoveredObj.filter(entry => {  // Get all entries where state is the same and country is the same
                return (entry["Province/State"] == value["Province/State"]) && (entry["Country/Region"] == value ["Country/Region"])
            });
            if (recoveredEntries.length == 0) {  // If there are no entries
                recovered.set(date, 0);     // we can assume there are no recoveries
            } else {
                recovered.set(date, parseInt(recoveredEntries[0][dateStr]));        // get the first element of recoveredEntries
            }

            // Set the latest date. This will run last so the var should contain the latest
            latestDate = date;
        });

        let city: string | undefined = undefined;
        let state: string | undefined = value["Province/State"];

        // If the state is defined and has a comma in it, set the city to what is before the comma
        if (state != undefined && state.split(',').length == 2) {
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

    return records;
}

const US_CONFIRMED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
const US_DEATHS_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"

export async function getLatestUSRecords(): Promise<RegionRecord[]> {
    let [confirmedResp, deathsResp] = await Promise.all([
        axios.get(US_CONFIRMED_URL),
        axios.get(US_DEATHS_URL),
    ]); // Get all three data points

    // if there is any errors getting the data
    if (confirmedResp.status != 200 || deathsResp.status != 200) {
        throw new Error("non 200 response code from github");
    }

    const confirmedCsv = confirmedResp.data;
    const deathsCsv = deathsResp.data;

    const confirmedObj: Array<object> = parse(confirmedCsv, {columns: true, skip_empty_lines: true});
    const deathsObj: Array<object> = parse(deathsCsv, {columns: true, skip_empty_lines: true});

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

        // This variable will contain the latest date for this entry
        // so we can get the most recent statistics.
        let latestDate: Date = new Date();

        // For every date key, add the data
        dateKeys.forEach((dateStr) => {
            let date = getDate(dateStr);
            confirmed.set(date, parseInt(confirmedObj[index][dateStr]));  // Set the data for the current index and date
            deaths.set(date, parseInt(deathsObj[index][dateStr]));        //

            // Set the latest date. This will run last so the var should contain the latest
            latestDate = date;
        });

        let city: string | undefined = undefined;
        let region: string = value["Combined_Key"];
        let country = "US";
        let state: string;

        // For some reason, some of the regions are seperated by ', ' and some are seperated by just a ','
        let split = region.split(', ').length >= 2 ? region.split(', ') : region.split(',');
        // If there are three different comma separated values, there is a city
        if (split.length == 3) {
            city = split[0];        // The city is the first element of the split
            state = split[1];       // The state is the second element.

            // for some reason there are some weird entries with the city "unassigned" so we'll just remove them here.
            if (city.toLowerCase().includes("unassigned")) {
                return;
            }
        } else if(split.length == 2) {
            state = split[0]
        } else {
            console.error("WE SHOULD NOT BE HERE CHECK THE CODE");
        }

        let record = new RegionRecord(
            city,
            state,
            country,
            value["Lat"],
            value["Long"],
            confirmed,
            deaths,
            undefined,
            latestDate
        );

        // If there are no infections don't use this entry
        if(record.getLatestEntry().infections == 0) {
            return;
        }

        records.push(record);
    });

    return records;
}

function isDate(text: string): boolean {
    // The dates are formatted m/d/yy so splitting it with `/` should give us a list of length 3
    let split = text.split("/");
    if (split.length != 3) {
        return false
    }

    let month = parseInt(split[0]);
    let day = parseInt(split[1]);
    let year = parseInt(split[2]);

    // If any of these fields are not numbers, return false
    if (isNaN(month)) {
        return false;
    }
    if (isNaN(day)) {
        return false;
    }
    if (isNaN(year)) {
        return false;
    }

    if (month > 12) {
        return false;
    }
    if (day > 31) {
        return false;
    }
    if (year > 25) {
        return false;
    }     // we shouldn't expect to get years after 2025. at least hopefully not...

    return true;
}

function getDate(date: string): Date {
    return new Date(date);
}

// earlier date first
function getDateDifferenceInDays(dt1: Date, dt2: Date) {
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}