var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var plus = google.plus('v1');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive.file'];
var TOKEN_DIR = './credential/';
var TOKEN_PATH = TOKEN_DIR + 'drive_token.json';
var TOKEN_SECRET = TOKEN_DIR + 'client_secret.json'

module.exports = {
    GUpload: function (file) {
        return new Promise((resolve, reject) => {
            fs.readFile(TOKEN_SECRET, function processClientSecrets(err, content) {
                if (err) {
                    console.log('Error loading client secret file: ' + err);
                    reject(err);
                }
                authorize(JSON.parse(content))
                    .then(oauth => {
                        resolve(gUpload(oauth, file));
                    }).catch(err => reject(err));
            });
        })
    },
    GFileRemove: function (id) {
        return new Promise((resolve, reject) => {
            fs.readFile(TOKEN_SECRET, function processClientSecrets(err, content) {
                if (err) {
                    console.log('Error loading client secret file: ' + err);
                    reject(err);
                }
                authorize(JSON.parse(content))
                    .then(oauth => {
                        resolve(gDelete(oauth, id));
                    }).catch(err => reject(err));
            });
        })
    },
    gplus: function () {
        /* var OAuth2 = google.auth.OAuth2;
        var oauth2Client = new OAuth2(
            '350022490200-ddvbbjp4pbtvnbhobcobil8jh1ri141d.apps.googleusercontent.com',
            'l0IXRjHOp2uNGuGtmQO9e_mF',
            '/fetch/google/oauth'
        );


        oauth2Client.credentials = {
            access_token: 'ya29.Gls0BcfDQPMq76l3s4SPTLGKTAavP9qQ3u6eNzPbK1FpquSaRFnPSWHXxzT7-VcrmCwGCKH-UeYQdKrBUAvnqPUZwf7evMsxw0iqhtP5r9Jv5tui2xj37G12DbcV',
            refresh_token: '1/zNrm73RBLG3cK044BUVyAIQMFbZDt5I45rmJxVP4U7U0EQYW87Meb6op8hU-cj0V'
          };          
        plus.people.get({
            userId: 'me',
            auth: oauth2Client
          },function (err, user) {
            console.log(user);
          }); */
    }
}
// Load client secrets from a local file.


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorize(credentials) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    return new Promise(
        (resolve, reject) => {
            fs.readFile(TOKEN_PATH, function (err, token) {
                if (err) reject(err);
                oauth2Client.credentials = JSON.parse(token);
                resolve(oauth2Client);
                //callback(oauth2Client);    
            });
        }
    )
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
    var service = google.drive('v3');
    service.files.list({
        auth: auth,
        pageSize: 10,
        fields: "nextPageToken, files(id, name)"
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var files = response.files;
        if (files.length == 0) {
            console.log('No files found.');
        } else {
            console.log('Files:');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('%s (%s)', file.name, file.id);
            }
        }
    });
}
/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

function gUpload(auth, file) {
    var fileMetadata = {
        'name': file.name
    };
    var media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(file.path)
    };

    var service = google.drive({ version: 'v3', auth: auth });
    return new Promise((resolve, reject) => {
        service.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (err, gfile) {
            if (err) {
                reject(err);
            } else {
                fs.unlinkSync(file.path, function (err) {
                    if (err) return console.log(err);
                    console.log('File deleted successfully');
                });
                resolve(gfile.id)
            }
        });
    })

}

function gDelete(auth, id) {
    var service = google.drive({ version: 'v3', auth: auth });
    return new Promise((resolve, reject) => {
        service.files.delete({
            fileId: id
        }, function (err, file) {
            if (err) {
                reject({ success: false })
                console.error(err);
            } else {
                resolve({ success: true });
            }
        });
    })
}
