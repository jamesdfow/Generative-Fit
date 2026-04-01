const express = require('express');

const app = express();
const port = 3010;

app.use(express.json());


app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on port", port);
});

