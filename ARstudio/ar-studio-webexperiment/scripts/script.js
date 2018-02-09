const Diagnostics = require('Diagnostics')
const Networking = require('Networking')
const Locale = require('Locale')
const Time = require('Time')
const Scene = require('Scene')
const Animation = require('Animation')

face = Scene.root.find("facemesh0")

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
    Time.ms.interval(2000).subscribe(function (elapsedTime) {
        data.stream.push({time: Math.floor(dataTime.lastValue)})
        addData()
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
        Diagnostics.log(data)
    })//.catch(error => Diagnostics.log(error))
}

getIdToken()