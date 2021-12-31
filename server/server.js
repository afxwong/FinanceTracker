const uri = require('./resource.js');
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
var jsonparser = bodyParser.json();

app.get('/api/bankbalance', async (req, res) => {
    res.json(await getBalance());
});

app.post('/api/bankformpost', jsonparser, async (req, res) => {
    console.log(req.body);
    insertTransaction(req.body);
    var balanceobj = await getBalance();
    var balance = balanceobj.balance;
    if (req.body.type == "deposit") {
        balance += parseFloat(req.body.amount);
    } else {
        balance -= parseFloat(req.body.amount);
    }
    await setBalance(balance);
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function getBalance() {
    try {
        await client.connect();
        const collection = client.db("FinRecords").collection("Balance");
        var result = await collection.find({}).sort({date:-1}).limit(1).toArray();
        if (result) {
            console.log("Balance Found");
        } else {
            console.log("No results");
        }
        return result[0];
    } catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
}

async function setBalance(amount) {
    try {
        await client.connect();
        const collection = client.db("FinRecords").collection("Balance")
        var date = new Date().toISOString();
        const result = await collection.insertOne({'date': date, 'balance': amount});
        if (result) {
            console.log("Balance Updated");
        } else {
            console.log("Bance not updated");
        }
    } catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
    
}

async function insertTransaction(newTransaction) {
    try {
        await client.connect();
        const collection = client.db("FinRecords").collection("BankTransactions");
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
