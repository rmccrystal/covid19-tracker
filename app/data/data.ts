import InfectionData from "./InfectionData";
import InfectionEntry from "../../frontend/src/data/InfectionEntry";

export function getInfectionData(): InfectionData {
    return new InfectionData([new InfectionEntry("United States", 21312, 2312, 142, "North America"),
        new InfectionEntry("France", 12412, 152, 132, "Europe"),
        new InfectionEntry("Germany", 123, 10, 12, "Europe"),
        new InfectionEntry("Russia", 442, 4, 9, "Europe"),
        new InfectionEntry("United Kingdom", 523, 32, 41, "Europe"),
        new InfectionEntry("Poland", 11, 2, 0, "Europe")])
}

/*
 * Dow
 */
function updateRepo() {

}

function cloneRepo() {

}