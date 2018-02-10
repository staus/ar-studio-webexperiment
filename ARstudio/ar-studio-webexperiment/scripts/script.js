const Diagnostics = require('Diagnostics')
const Networking = require('Networking')
const Locale = require('Locale')
const Time = require('Time')
const Scene = require('Scene')
const Animation = require('Animation')
const FaceTracking = require('FaceTracking')
const Reactive = require('Reactive')

face = Scene.root.find("facetracker0")
faceTracking = FaceTracking.face(0)
// floor = Scene.root.find("floor")
floorPosition = Scene.root.find("floorPosition")

////////////////
// Networking
////////////////
const timeDriver = Animation.timeDriver({durationMilliseconds:1800000, loopCount: 1})
const timeSampler = Animation.samplers.linear(0, 1800000)
var dataTime = Animation.animate(timeDriver, timeSampler)
timeDriver.start()

var idToken = null
var sessionId = null
var putHeader = null
var data = {
    lastTime: 0,
    locale: Locale.fromDevice,
    stream: [],
}

function getIdToken() {
    Diagnostics.log('getIdToken()')
    Networking.fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDfnN76wwXTOaokJMeDGihL2BlAfdrudTc', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({"email":"ns@molamil.com","password":"YYdcF3HwZZ79xuN4t","returnSecureToken":true})
    }).then(function(result){
        Diagnostics.log(result)
        return result.json();
    }).then(function(data) {
        Diagnostics.log(data)
        idToken = data.idToken
        streamData()
    })//.catch(error => Diagnostics.log(error))
}

function streamData() {
    addData()
    // Prepare a new bucket for a stream of frames
    data.stream.push({})
    data.stream[data.stream.length-1].frames = []
    // Start dropping frames into the bucket
    startTracking()
    Time.ms.interval(2000).subscribe(function (elapsedTime) {
        //Diagnostics.log(face.transform)

        // Add a time stamp just before pushing the latest stream of frames
        data.lastTime = Math.floor(dataTime.lastValue)
        data.stream[data.stream.length-1].time = Math.floor(dataTime.lastValue)
        addData()
        // Prepare a new bucket for a stream of frames
        data.stream.push({})
        data.stream[data.stream.length-1].frames = []
    });
}

function addData() {
    if (idToken == null) return
    var url
    var currentMethod
    if (sessionId == null) {
        url = 'https://ar-studio-webexperiment.firebaseio.com/sessions.json?auth=' + idToken.toString()
    } else {
        url = 'https://ar-studio-webexperiment.firebaseio.com/sessions/' + sessionId + '.json?auth=' + idToken.toString()
        putHeader = {'X-HTTP-Method-Override': 'PATCH'}
        
    }
    Networking.fetch(url, {
        headers: putHeader,
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function(result){
        Diagnostics.log(result)
        return result.json();
    }).then(function(data) {
        if (sessionId == null){
            sessionId = data.name
            Diagnostics.log('new sessionId: ' + sessionId)
        }
        //Diagnostics.log(data)
    })//.catch(error => Diagnostics.log(error))
}

getIdToken()
var rotY = 0
var rowX = 0
var rowXprev = 0
var faceRotY = FaceTracking.face(0).cameraTransform.rotationY
faceRotY.monitor().subscribe(function (e) {
    rotY = e.newValue / (Math.PI * 2)
    const floorX = floorPosition.transform.x.lastValue + rotY * 4
    floorPosition.transform.x = floorX
    rowX = Math.round(floorX / 10)
    if (rowXprev != rowX) {
        rowXprev = rowX
        Diagnostics.log('rowX: ' + rowX)
    }
})

var rotX = 0
var rowY = 0
var rowYprev = 0
var faceRotX = FaceTracking.face(0).cameraTransform.rotationX
faceRotX.monitor().subscribe(function (e) {
    rotX = e.newValue / (Math.PI * 2) + 0.055
    const floorY = floorPosition.transform.y.lastValue - rotX * 4
    floorPosition.transform.y = floorY
    rowY = Math.round(floorY / 10)
    if (rowYprev != rowY) {
        rowYprev = rowY
        Diagnostics.log('rowY: ' + rowY)
    }
    
})

var faceRotZ = FaceTracking.face(0).cameraTransform.rotationZ
faceRotZ.monitor().subscribe(function (e) {})

faceTracking.mouth.openness.monitor().subscribe(function (e) {})

/*var rotZ = 0
var faceRotZ = FaceTracking.face(0).cameraTransform.rotationZ
faceRotZ.monitor().subscribe(function (e) {
    rotZ = e.newValue / (Math.PI * 2)
    sphere.transform.rotationZ = sphere.transform.rotationZ.lastValue + rotZ / 4
})*/

function startTracking() {
    Time.ms.interval(1000/15).subscribe(function (elapsedTime) {
        //sphere.transform.rotationY = sphere.transform.rotationY.lastValue + rotY / 2
        data.stream[data.stream.length-1].frames.push({
            rotation: {x: faceRotX.lastValue, y: faceRotY.lastValue, z: faceRotZ.lastValue},
            // rotation: {x: sphere.transform.rotationX.lastValue, y: sphere.transform.rotationY.lastValue, z: sphere.transform.rotationZ.lastValue},
            mouth: faceTracking.mouth.openness.lastValue,
        })
    })
}