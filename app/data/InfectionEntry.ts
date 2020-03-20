import InfectionEntry, {Continent as _Continent, sumInfectionEntries as _sumInfectionEntries} from "../../frontend/src/data/InfectionEntry";

export type Continent = _Continent;
export const sumInfectionEntries: (entries: InfectionEntry[]) => InfectionEntry = _sumInfectionEntries;

export default InfectionEntry;