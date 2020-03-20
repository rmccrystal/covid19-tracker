import express from 'express';
import {getInfectionData} from "./data/data";

var router = express.Router();

router.post('/getInfectionData', ((req, res) => {
    res.json(getInfectionData())
}));

export default router;