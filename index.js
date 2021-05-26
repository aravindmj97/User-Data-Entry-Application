var express = require("express");
var app = express();
var queries = require("./db_actions/query");
var cors = require('cors');
var bodyParser = require("body-parser");
const {validateToken,generateToken} = require('./middleware/authorization');

app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.status(200).send({message: "Welcome"});
});

app.get("/vaccineDetails", function (req, res) {
    queries.fetchVaccineDetails().then((result) => res.status(200).send(result)).catch(console.dir);
});

app.get("/vaccineDetails/:user", function (req, res) {
    const params = JSON.parse(req.params.user);
    queries.fetchVaccineDetailsWithKey(params).then((result) => res.status(200).send(result)).catch(console.dir);
});

app.post("/vaccineDetails", validateToken, function (req, res) {
    const params = req.body;
    queries.copyDraftUserDataToMasterDataCollection(params).then((result) => res.status(200).send(result)).catch(console.dir);
});

app.get("/firstVaccineDetails", validateToken, function (req, res) {
    queries.fetchFirstVaccineDetailsDraft().then((result) => res.status(200).send(result)).catch(console.dir);
});

app.post("/firstVaccineDetails", function (req, res) {
    const userData = req.body;
    queries.saveFirstVaccineDetailsDraft(userData).then((result) => res.status(200).send(result)).catch(console.dir);
});

app.get("/firstVaccineDetails/:user", validateToken, function (req, res) {
    const params = JSON.parse(req.params.user);
    queries.fetchFirstVaccineDetailsDraftWithKey(params).then((result) => res.status(200).send(result)).catch(console.dir);
});

app.post("/updateVaccineDetails", validateToken, function (req, res) {
    const userData = req.body;
    queries.updateVaccineDetails(userData).then((result) => res.status(200).send(result)).catch(console.dir);
});

app.get("/tset", validateToken, function (req, res) {
    console.log("gg")
    res.send({auth: true});
});

app.post("/login", function (req, res) {
    const userData = req.body;
    queries.login(userData).then((result) => {
        if(result !== null){
            var token = generateToken(result.email);
            res.status(200).send({auth:true, message:`Welcome ${result.name}`, token:token});
        }else{
            res.status(401).send({auth:false, message:"Wrong email or password"});
        }
    }).catch(console.dir);
});

app.listen(3000);
