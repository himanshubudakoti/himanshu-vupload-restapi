var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var ArrayList = require('arraylist');

var PORT = process.env.PORT || 2000;
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, './Images');

var app = Express();
app.use(bodyParser.json());
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("videoUploader", 3); //Field name and max count

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }

        return res.end("File uploaded sucessfully!.");
    });
});


app.get("/files", function (req, res) {

    getFiles(directoryPath);

    // //passsing directoryPath and callback function
    // fs.readdir(directoryPath, function (err, files) {
    //     //handling error
    //     if (err) {
    //         return console.log('Unable to scan directory: ' + err);
    //     } 
    //     //listing all files using forEach
    //     files.forEach(function (file) {
    //         // Do whatever you want to do with the file
    //         console.log(file); 
    //     });
    // });
});

function getFiles(dir) {
    // console.log('[+]', dir);
    var files = fs.readdirSync(dir);
    var list = new ArrayList;
    files.forEach(function (file) {
        file = dir + '/' + file;
        list.add(file);
        // Do whatever you want to do with the file
        
    });
    console.log(list);
}



app.listen(PORT, function (a) {
            console.log("Your API Listening to port :- " + PORT + "!");
        });