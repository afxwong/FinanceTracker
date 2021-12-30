const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
var jsonparser = bodyParser.json();

app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!", date: "Today" });
});

app.post('/api/bankformpost', jsonparser, (req, res) => {
    console.log(req.body);
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
