const uri = require('./resource.js');
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
var jsonparser = bodyParser.json();

app.get('/api/balances', async (req, res) => {
    res.json([await getBalance(), await getPayment()]);
});

app.get('/api/initiatepayment', async (req, res) => {
    var bankbalance = await getBalance();
    var payment = await getPayment();
    var date = new Date().toISOString();
    var newBalance = {'date': date, 'balance': bankbalance.balance - payment.balance};
    var newPayment = {'date': date, 'balance': 0};
    var newTransaction = {'date': date, 'amount': payment.balance, 'type': 'payment'};
    await setBalance(newBalance.balance);
    await setPayment(newPayment.balance);
    await insertTransaction(newTransaction);
    await insertCreditTransaction(newTransaction);
    res.json({message : "Payment Initiated"});
});

app.post('/api/bankformpost', jsonparser, async (req, res) => {
    console.log(req.body);
    await insertTransaction(req.body);
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

app.post('/api/creditformpost', jsonparser, async (req, res) => {
    console.log(req.body);
    await insertCreditTransaction(req.body);
    var paymentobj = await getPayment();
    var payment = paymentobj.balance;
    if (req.body.type == "charge") {
        payment += parseFloat(req.body.amount);
    } else {
        payment -= parseFloat(req.body.amount);
    }
    await setPayment(payment);
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
            console.log("Balance not updated");
        }
    } catch (e) {
        console.log(e);
    } finally {
        client.close();
    }
    
}

async function getPayment() {
    try {
        await client.connect();
        const collection = client.db("FinRecords").collection("Payment");
        var result = await collection.find({}).sort({date:-1}).limit(1).toArray();
        if (result) {
            console.log("Payment Found");
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

async function setPayment(amount) {
    try {
        await client.connect();
        const collection = client.db("FinRecords").collection("Payment")
        var date = new Date().toISOString();
        const result = await collection.insertOne({'date': date, 'balance': amount});
        if (result) {
            console.log("Payment Updated");
        } else {
            console.log("Payment not updated");
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

async function insertCreditTransaction(newTransaction) {
    try {
        await client.connect();
        const collection = client.db("FinRecords").collection("CreditTransactions");
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
