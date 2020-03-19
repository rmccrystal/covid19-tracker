import {IDataSource} from "../data";
import InfectionEntry from "../InfectionEntry";

export default class TestDataSource implements IDataSource {
    getInfections(): InfectionEntry[] {
        return [new InfectionEntry("United States", 100, 10, 50, "North America"),
            new InfectionEntry("France", 1000, 42, 523, "Europe")];
    }
}