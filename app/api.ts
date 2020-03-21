import express from 'express';
import {getInfectionData} from "./data/data";
import InfectionData from "../frontend/src/data/InfectionData";
import {RawInfectionData} from "./data/rawData";

var router = express.Router();
var latestData: RawInfectionData | undefined = undefined;   // this will be updated with the latest data

export function updateLatestData(data: RawInfectionData) {
    latestData = data;
}

router.post('/getInfectionData', ((req, res) => {
    if(latestData === undefined) {
        res.json({error: "infection data has not updated yet"})
    } else {
        res.json(new InfectionData(latestData.getCountryEntries()))
    }
}));

export default router;