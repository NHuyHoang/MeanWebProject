const Google = require('../services/GoogleService');
var multer = require('multer');
var fs = require('fs');
const DIR = './view';

module.exports = {
    GUpload: (req, res) => {
        LocalUpload(req, res)
            .then(files => {
                GDriveUpload(files)
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    },
    localUpload: (req, res) => {
        //after upload to local -> upload to drive
        LocalUpload(req, res)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
}

function LocalUpload(req) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIR)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
    });

    var upload = multer({ storage: storage }).any();

    return new Promise((resolve, reject) => {
        upload(req, null, function (err) {
            if (err) {
                reject(err.toString());
            }
            let result = [];
            req.files.forEach(element => {
                result.push(
                    {
                        name: element.filename,
                        path: element.path
                    }
                );
            });
            resolve(result);
        });
    });

}

function GDriveUpload(files) {
    var uploadedFiles = [];
    return new Promise((resolve, reject) => {
        files.forEach(file => {
            let upload = Google.GUpload(file).then(result => {
                uploadedFiles.push(result);
                if (uploadedFiles.length == files.length) {
                    resolve(uploadedFiles);
                };
            }).catch(err => reject(err));

        })
    })
}