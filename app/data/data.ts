import InfectionEntry from "./InfectionEntry";
import TestDataSource from "./sources/TestDataSource";

/*
 * The DataSource interface
 * This interface is an abstraction for any covid-19 data source
 * It contains a function which returns the list of all infection datad
 */
export interface IDataSource {
    getInfections: () => InfectionEntry[]
}

// DataSource is the current data source we are using
export const DataSource: IDataSource = new TestDataSource();