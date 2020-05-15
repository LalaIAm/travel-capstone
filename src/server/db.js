const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-server-sdk');

const appId = process.env.MONGODB_APPID;

const stitch = Stitch.initializeDefaultAppClient(appId);

stitch.auth.loginWithCredential(new AnonymousCredential())
    .then(user => {
        console.log('logged in anonymously as user: ', user.id)
        
    }).catch(err => console.log('db error: ', err));

const mongo = stitch.getServiceClient(
    RemoteMongoClient.factory,
    'mongodb-atlas'
)

const trips = mongo.db('journeyJournal').collection('trips');

module.exports = { trips, stitch };