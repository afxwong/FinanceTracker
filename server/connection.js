const uri = require('./resource.js');
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function addBalance() {
    const collection = await client.db("FinRecords").collection("Payment")
    var date = new Date().toISOString();
    const result = await collection.insertOne({'date': date, 'balance': 193.24});
    // const result = await collection.find({}).sort({_id:-1}).limit(1).toArray();
}

async function getBalance() {
    const collection = await client.db("FinRecords").collection("Balance")
    const result = await collection.find({}).sort({date:-1}).limit(1).toArray();
    console.log(result);
}

async function connect() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await addBalance();
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
connect().catch(console.error);
