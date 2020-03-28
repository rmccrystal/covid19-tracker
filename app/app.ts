import express from "express"
import Api, {updateLatestData} from "./api"
import cors from "cors"
import {getInfectionData} from "./data/data";
import * as path from "path";
import morgan from "morgan";

const app = express();
setInterval(() => {
    getInfectionData().then(data => {
        updateLatestData(data);
    });
}, 500000); // update every 500 seconds

getInfectionData().then(data => {
    updateLatestData(data);
});

app.use(morgan('common'));

app.use(cors());
app.use(express.static('frontend/build'));

app.use("/api", Api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/..//frontend/build/index.html'))
})

let port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});