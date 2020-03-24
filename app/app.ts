import express from "express"
import Api, {updateLatestData} from "./api"
import cors from "cors"
import {getLatestData} from "./data/historicalDataApi";
import * as Covid19Api from "covid19-api";
import {GetReportsResponse, Table} from "covid19-api";


Covid19Api.default.getReports().then((res) => {
    let resp: GetReportsResponse = res[0][0];
    resp.table[0].forEach((value => {
        console.log(value.Country, value.ActiveCases  )
    }))
});

const app = express();

app.use(cors());
app.use(express.static('frontend/build'));

app.use("/api", Api);

let port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});