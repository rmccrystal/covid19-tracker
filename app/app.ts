import express from "express"
import Api from "./api"
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.static('frontend/build'));

app.use("/api", Api);

let port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});