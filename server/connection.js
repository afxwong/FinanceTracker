const uri = require('./resource.js');

const { MongoClient } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function getLastEntry(client, nameOfListing) {
    const collection = await client.db("sample_airbnb").collection("listingsAndReviews")
    const result = await collection.find({}).sort({_id:-1}).limit(1).toArray();
    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function connect() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await getLastEntry(client, "Ribeira Charming Duplex");
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
connect().catch(console.error);