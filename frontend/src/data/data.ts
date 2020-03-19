import InfectionEntry from "./InfectionEntry";

export function GetInfections(): InfectionEntry[] {
    return [new InfectionEntry("United States", 100, 10, 50), new InfectionEntry("Europe", 1000, 42, 523), new InfectionEntry("poop", 1000, 42, 523)]
}