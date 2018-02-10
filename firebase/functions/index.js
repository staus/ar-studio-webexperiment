const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onSessionAdd = functions.database.ref('sessions/{session}').onCreate((event) => {
    event.data.ref.child('timestamp').set(Date.now())
})

/*exports.onSessionUpdate = functions.database.ref('sessions/{session}').onUpdate((event) => {
    event.data.ref.child('lastUpdated').set(admin.database.ServerValue.TIMESTAMP)
})*/