declare module "covid19-api" {
    export class PluginManager {
        getReports(): Promise<GetReportsResponse[][]>;
        getReportsByCountries(country: string): Promise<any>;
        getDeaths(): Promise<any>;
        getSituationReports(): Promise<any>;
        getTaskForceInfoUS(): Promise<any>;
        getGlobalData(): Promise<any>;
        getTestsInUS(): Promise<any>;
        getFatalityRateByAge(): Promise<any>;
        getFatalityRateBySex(): Promise<any>;
        getFatalityRateByComorbidities(): Promise<any>;
        getCountriesWhereCoronavirusHasSpread(): Promise<any>;
        getTravelHealthNotices(): Promise<any>;
        getAllCasesInAmerica(): Promise<any>;
        getAllCasesInEurope(): Promise<any>;
        getCaseStatusUndeEvalutationInPR(): Promise<any>;
    }

    const defaultExport: PluginManager;
    export default defaultExport;

    // TYPES
    export interface GetReportsResponse {
        cases:        number;
        deaths:       number;
        recovered:    number;
        active_cases: ActiveCase[];
        closed_cases: ClosedCase[];
        table:        Table[][];
    }

    export interface ActiveCase {
        currently_infected_patients: number;
        inMidCondition:              number;
        criticalStates:              number;
    }

    export interface ClosedCase {
        cases_which_had_an_outcome: number;
        recovered:                  number;
        deaths:                     number;
    }

    export interface Table {
        TotalCases:       string;
        NewCases:         string;
        TotalDeaths:      string;
        NewDeaths:        string;
        TotalRecovered:   string;
        ActiveCases:      string;
        Country:          string;
        Serious_Critical: string;
        TotCases_1M_Pop:  string;
    }
} // This library doesn't have typescript bindings