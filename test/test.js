// Initialize Firebase
var config = {
	apiKey: "AIzaSyCS0ozdv3p3cGgwbfqcGL3z227PqtOi4IY",
	authDomain: "ks-pact-website.firebaseapp.com",
	databaseURL: "https://ks-pact-website.firebaseio.com",
	projectId: "ks-pact-website",
	storageBucket: "ks-pact-website.appspot.com",
	messagingSenderId: "751950777978"
};
firebase.initializeApp(config);

/*var playersRef = firebase.database().ref('players');

playersRef.push ({
   name: "John",
   number: 1,
   age: 30
});

playersRef.push ({
   name: "Amanda",
   number: 2,
   age: 20
});

console.log(playersRef)
*/

/*var playersRef = firebase.database().ref().child("players");

var playersKey = playersRef.key;
console.log(playersKey);*/

/*var amandaAgeRef = firebase.database().ref().child("players").child("-L55ZpjPzhWSfrDFW9g7").child('age');

amandaAgeRef.transaction(function(currentAge) {
   return currentAge + 1;
});*/

/*var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
   console.log(snapshot.val());
}, function (error) {
   console.log("Error: " + error.code);
});*/

var playersRef = firebase.database().ref("players/");

playersRef.orderByChild("name").on("child_added", function(data) {
   console.log(data.val().name);
});

playersRef.push ({
   name: "Bob",
   number: 3,
   age: 40
});