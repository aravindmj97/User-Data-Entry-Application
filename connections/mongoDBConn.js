const MongoClient = require("mongodb").MongoClient;
const dotenv = require('dotenv');

dotenv.config();
var dbClient;
const uri = process.env.MONGODBURL;
if (dbClient == undefined) {
  dbClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
const dbName = "ward_user_data";
const masterDataCollection = "user_master_data";
const draftDataCollection = "user_draft_data";
const authorization_collection = 'user_auth';

module.exports = { dbClient, dbName, masterDataCollection, draftDataCollection, authorization_collection };
