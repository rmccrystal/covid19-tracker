import express from 'express';
import InfectionData from "../frontend/src/shared/InfectionData";

var router = express.Router();
var latestData: InfectionData | undefined = undefined;   // this will be updated with the latest data

export function updateLatestData(data: InfectionData) {
    latestData = data;
}

router.post('/getInfectionData', ((req, res) => {
    if(latestData === undefined) {
        res.json({error: "infection data has not updated yet"})
    } else {
        res.json(latestData)
    }
}));

export default router;