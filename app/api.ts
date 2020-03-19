import express from 'express';
import {DataSource} from "./data/data";

var router = express.Router();

router.post('/getInfections', ((req, res) => {
    res.json(DataSource.getInfections())
}));

export default router;