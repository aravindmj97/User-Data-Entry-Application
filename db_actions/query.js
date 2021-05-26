const {
  dbClient,
  dbName,
  masterDataCollection,
  draftDataCollection,
  authorization_collection
} = require("../connections/mongoDBConn");

module.exports.fetchVaccineDetailsWithKey = async function (queryParams) {
  try {
    await dbClient.connect();
    const oDatabase = dbClient.db(dbName);
    const oMasterDataCollection = oDatabase.collection(masterDataCollection);
    const result = await oMasterDataCollection.findOne(queryParams);
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    //await dbClient.close();
  }
};

module.exports.fetchVaccineDetails = async function () {
  try {
    await dbClient.connect();
    const oDatabase = dbClient.db(dbName);
    const oMasterDataCollection = oDatabase.collection(masterDataCollection);
    const result = await oMasterDataCollection.find({});
    return await result.toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    //await dbClient.close();
  }
};

module.exports.copyDraftUserDataToMasterDataCollection = async function (
  draftDataParams
) {
  try {
    await dbClient.connect();
    const oDatabase = dbClient.db(dbName);
    const oDraftDataCollection = oDatabase.collection(draftDataCollection);
    const result = await oDraftDataCollection.updateOne(draftDataParams);
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    //await dbClient.close();
  }
};

module.exports.fetchFirstVaccineDetailsDraftWithKey = async function (
  queryParams
) {
  try {
    await dbClient.connect();
    const oDatabase = dbClient.db(dbName);
    const oDraftDataCollection = oDatabase.collection(draftDataCollection);
    const result = await oDraftDataCollection.findOne(queryParams);
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    //await dbClient.close();
  }
};

module.exports.fetchFirstVaccineDetailsDraft = async function () {
  try {
    await dbClient.connect();
    const oDatabase = dbClient.db(dbName);
    const oDraftDataCollection = oDatabase.collection(draftDataCollection);
    const result = await oDraftDataCollection.find({});
    return await result.toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    //await dbClient.close();
  }
};

module.exports.saveFirstVaccineDetailsDraft = async function (data) {
  try {
    await dbClient.connect();
    const oDatabase = dbClient.db(dbName);
    const oDraftDataCollection = oDatabase.collection(draftDataCollection);
    const result = await oDraftDataCollection.insertOne(data);
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    //await dbClient.close();
  }
};

module.exports.updateVaccineDetails = async function (data) {
  try {
    await dbClient.connect();
    const oDatabase = dbClient.db(dbName);
    const oDraftDataCollection = oDatabase.collection(draftDataCollection);
    const result = await oDraftDataCollection.updateOne(data, {$set:{accept:true}});
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    //await dbClient.close();
  }
};

module.exports.login = async function (data) {
  try {
    await dbClient.connect();
    const oDatabase = dbClient.db(dbName);
    const oAuthorizationCollection = oDatabase.collection(authorization_collection);
    const result = await oAuthorizationCollection.findOne(data);
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    //await dbClient.close();
  }
};
