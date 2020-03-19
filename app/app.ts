import express from "express"
import Api from "./api"

const app = express();

app.use(express.static('frontend/build'));

app.use("/api", Api);

let port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});