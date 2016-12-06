var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var jsonfile = require('jsonfile')
var app = express();

var file = './src/js/data/contacts.json';
var output = './src/js/data/output.json';
var _DATA;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});
app.use(express.static("./public"));
app.use(cors());



loadData(file);//why isnt this pure?



app.get("/", function(req, res) {
    res.send("May the force be with you");
});

app.get("/contacts", function(req, res) {
    var TMP = _DATA.slice(0); //lets not mutate
    var RES; 
    switch( req.query.sort ) {
        case "ASC" :
            RES = sortUp(TMP);
            break;
        case "DSC" :
            RES = sortDown(TMP);
            break;
        default:
            RES = TMP;
    }
    res.json(RES);
});

app.get("/contacts/:id", function(req, res) {
    result = _DATA.filter(function(n) {
        return n.id == req.params.id;
    });
    res.json(result);
});

app.post("/contacts", function(req, res) {
    _DATA = req.body;
    saveFile(file, _DATA); //persist to local file
    res.json(_DATA);
});


function loadData(f){
    //console.log("loading data from file");
    jsonfile.readFile(f, function(err, obj) {
        _DATA = obj;
    })
}

function saveFile(f, d){
    //console.log("saving data to file");
    jsonfile.writeFile(f, d, function (err) {
        if ( err )
            console.error(err)
    })
}

function sortUp(d){
    d.sort(function(x, y) {
        return x["first_name"].localeCompare(y["first_name"]);
    });
    return d;
}

function sortDown(d){
    d.sort(function(x, y) {
        return y["first_name"].localeCompare(x["first_name"]);
    });
    return d;
}


app.listen(3000);

console.log("Johnny Five is Alive... on port 3000");

module.exports = app;