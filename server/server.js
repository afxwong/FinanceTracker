const uri = require('./resource.js');
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
    insertTransaction(req.body);
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function insertTransaction(newTransaction) {
    try {
        await client.connect();
        const collection = await client.db("FinRecords").collection("BankTransactions");
        const result = await collection.insertOne(newTransaction);
        if (result) {
            console.log("Inserted");
        } else {
            console.log("Not inserted");
        }
    } catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
}
