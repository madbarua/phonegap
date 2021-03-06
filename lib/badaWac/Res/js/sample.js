/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Device
 */

function setDeviceInfo() {
	var deviceInfo = document.getElementById("device");
	deviceInfo.innerHTML = "device.name: " + device.name +
	                   "<br />device.cordova: " + device.cordova +
	                   "<br />device.uuid: " + device.uuid +
	                   "<br />device.version: " + device.version +
	                   "<br />device.platform " + device.platform
	
}

/*
 * Acceleration
 */
var accelWatchID = null;

function getCurrentAcceleration() {
	var successCallback = function(acceleration) {
		var accelEm = document.getElementById("acceleration");
		accelEm.innerHTML = "X: "+acceleration.x + " Y: " + acceleration.y + " Z: " + acceleration.z;
	};
	
	var errorCallback = function(error) {
		console.log(error);
		document.getElementById("acceleration").innerHTML = "ERROR";
	};
	navigator.accelerometer.getCurrentAcceleration(successCallback, errorCallback, null);
}

function toggleAcceleration() {
	var accelBtn = document.getElementById("accelBtn");
	if(accelBtn.innerHTML == "watchAcceleration") {
		watchAcceleration();
		accelBtn.innerHTML = "clearWatch";
	} else {
		clearAccelerationWatch();
		accelBtn.innerHTML = "watchAcceleration";
	}
}

function watchAcceleration() {
	var successCallback = function(acceleration) {
		console.log("watchAcceleration::successCallback");
		var accelEm = document.getElementById("acceleration");
		accelEm.innerHTML = "X: "+acceleration.x + " Y: " + acceleration.y + " Z: " + acceleration.z;
	};
	
	var errorCallback = function(error) {
		console.log(JSON.stringify(error));
		document.getElementById("acceleration").innerHTML = "ERROR";
	};
	accelWatchID = navigator.accelerometer.watchAcceleration(successCallback, errorCallback, {frequency: 1000});
	console.log("watchAcceleration "+accelWatchID);
}
function clearAccelerationWatch() {
	if(accelWatchID != null) {
		navigator.accelerometer.clearWatch(accelWatchID);
		accelWatchID = null;
		document.getElementById("acceleration").innerHTML = "";
		console.log("clearAccelerationWatch");
	}
}

/*
 * Geolocation
 */

var geoWatchID = null;

function getCurrentPosition() {
	var successCallback = function(geolocation) {
		var geoEm = document.getElementById("geolocation");
		geoEm.innerHTML = "Latitude: "+geolocation.coords.latitude + " Longitude: " + geolocation.coords.longitude;
	};
	
	var errorCallback = function(error) {
		console.log(error);
		var geoEm = document.getElementById("geolocation");
		geoEm.innerHTML = "ERROR";
	};
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function togglePosition() {
	var geoBtn = document.getElementById("geoBtn");
	if(geoBtn.innerHTML == "watchPosition") {
		watchPosition();
		geoBtn.innerHTML = "clearWatch";
	} else {
		clearPositionWatch();
		geoBtn.innerHTML = "watchPosition";
	}
}

function watchPosition() {
	var successCallback = function(geolocation) {
		console.log("watchPosition::successCallback");
		var geoEm = document.getElementById("geolocation");
		geoEm.innerHTML = "latitude: "+geolocation.coords.latitude + " longitude: " + geolocation.coords.longitude;
	};
	
	var errorCallback = function(error) {
		console.log(error);
		var geoEm = document.getElementById("geolocation");
		geoEm.innerHTML = "ERROR";
	};
	geoWatchID = navigator.geolocation.watchPosition(successCallback, errorCallback);
	console.log("watchPosition "+geoWatchID);
}
function clearPositionWatch() {
	if(geoWatchID != null) {
		navigator.geolocation.clearWatch(geoWatchID);
		geoWatchID = null;
		document.getElementById("geolocation").innerHTML = "";
		console.log("clearPositionWatch");
	}
}

/*
 * Compass
 */

var compassWatchID = null;

function getCurrentHeading() {
	var successCallback = function(heading) {
		var headingEm = document.getElementById("heading");
		headingEm.innerHTML = "magnetic Heading: "+ heading.magneticHeading + 
		                      " true Heading: " + heading.trueHeading +
		                      " heading accuracy: " + heading.headingAccuracy +
		                      " heading timestamp " + heading.timestamp;
	};
	
	var errorCallback = function(error) {
		console.log(error);
		var headingEm = document.getElementById("heading");
		headingEm.innerHTML = "ERROR";
	};
	navigator.compass.getCurrentHeading(successCallback, errorCallback);
}

function toggleCompass() {
	var geoBtn = document.getElementById("compassBtn");
	if(geoBtn.innerHTML == "watchHeading") {
		watchHeading();
		compassBtn.innerHTML = "clearWatch";
	} else {
		clearHeadingWatch();
		compassBtn.innerHTML = "watchHeading";
	}
}

function watchHeading() {
	var successCallback = function(heading) {
		console.log("watchHeading::successCallback");
		var headingEm = document.getElementById("heading");
		headingEm.innerHTML = "magnetic Heading: "+ heading.magneticHeading + 
		" true Heading: " + heading.trueHeading +
		" heading accuracy: " + heading.headingAccuracy +
		" heading timestamp " + heading.timestamp;
	};
	
	var errorCallback = function(error) {
		console.log(error);
		var headingEm = document.getElementById("heading");
		headingEm.innerHTML = "ERROR";
	};
	compassWatchID = navigator.compass.watchHeading(successCallback, errorCallback);
	console.log("watchHeading "+compassWatchID);
}
function clearHeadingWatch() {
	if(compassWatchID != null) {
		navigator.compass.clearWatch(compassWatchID);
		compassWatchID = null;
		document.getElementById("heading").innerHTML = "";
		console.log("clearHeadingWatch");
	}
}

/*
 * Connection
 */

function getConnection() {
	var connectionEm = document.getElementById("connection");
	connectionEm.innerHTML = "Connection type "+navigator.network.connection.type;
}

/*
 * Notification
 */

function notificationAlert() {
	var notifEm = document.getElementById('result');
	var alertDismissed = function() {
		console.log('alertDismissed');
	};
	navigator.notification.alert('You are the winner!', alertDismissed, 'Game Over', 'Done');
}

function notificationVibrate() {
	navigator.notification.vibrate(2000);
}

function notificationBeep() {
	navigator.notification.beep(4, 2000);
}

function notificationLightOn() {
	navigator.notification.lightOn(2000);
}

function cameraPreview() {
    var preview = document.getElementById("preview");
    if(preview.childNodes[0]) {
    	preview.removeChild(preview.childNodes[0]);
    	document.getElementById("cameraControls").style.display = "none";
    } else {
    	navigator.camera.getPreview();
    	document.getElementById("cameraControls").style.display = "";
    }
}

function startVideoCapture() {
	var success = function(filename) {console.log(filename); };
	var fail = function(error) { console.log("ERROR "+JSON.stringify(error)); };
	navigator.capture.captureVideo(success, fail, {duration: 5000, destinationFilename: "videos/a.3gp"});
}

function stopVideoCapture() {
	navigator.capture.stopVideoCapture();
}

function captureImage() {
	var success = function(filename) {
		console.log(filename);
	};
	var fail = function(error) {
		console.log("ERROR"+JSON.stringify(error));
	};
	var options = { destinationFilename: "images/cam01.jpg", highRes: false};
	navigator.capture.captureImage(success, fail, options);
}
