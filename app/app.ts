import express from "express"

const app = express();

app.use(express.static('frontend/build'));

let port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});