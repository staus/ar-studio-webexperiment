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

exports.deleteOldItems = functions.database.ref('sessions/{session}').onWrite(event => {
  var ref = event.data.ref.parent; // reference to the items
  var now = Date.now();
  var cutoff = now - 12 * 60 * 1000;
  var oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
  return oldItemsQuery.once('value', function(snapshot) {
    // create a map with all children that need to be removed
    var updates = {};
    snapshot.forEach(function(child) {
      updates[child.key] = null
    });
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
  });
});

/*exports.onSessionUpdate = functions.database.ref('sessions/{session}').onUpdate((event) => {
    event.data.ref.child('lastUpdated').set(admin.database.ServerValue.TIMESTAMP)
})*/