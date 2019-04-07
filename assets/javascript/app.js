$(document).ready(function () {
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBATdL0APqY1EWlBRyVGjNfDBNm9YYx-tM",
    authDomain: "hello-ef3c8.firebaseapp.com",
    databaseURL: "https://hello-ef3c8.firebaseio.com",
    projectId: "hello-ef3c8",
    storageBucket: "hello-ef3c8.appspot.com",
    messagingSenderId: "59218958400"
};

firebase.initializeApp(config);


var database = firebase.database();
$("#add-user").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    database.ref().push({
        train: trainName,
        destination: trainDestination,
        firstTrainTime: trainTime,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

  database.ref().on("child_added", function (childSnapshot) {
   console.log(childSnapshot.val());

    var newTrainName = childSnapshot.val().train;
    var newTrainDestination = childSnapshot.val().destination;
    var newTrainTime = childSnapshot.val().firstTrainTime;
    var newFrequency = childSnapshot.val().frequency;

    var startTimeConverted = moment(newTrainTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    var tRemainder = diffTime % newFrequency;
    var tMinutesTillTrain = newFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

      
  var newRow = $("<tr>").append(
    $("<td>").text(newTrainName),
    $("<td>").text(newTrainDestination),
    $("<td>").text(newFrequency),
    $("<td>").text(catchTrain),
    $("<td>").text(tMinutesTillTrain),
  );

  $("#train-table > tbody").append(newRow);
});
})