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

// Create a variable to reference the database
var database = firebase.database();
// Capture Button Click
$("#add-user").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    // Grabs user input
    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // Uploads employee data to the database
    database.ref().push({
        train: trainName,
        destination: trainDestination,
        firstTrainTime: trainTime,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    alert("Train information successfully added");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  database.ref().on("child_added", function (childSnapshot) {
   console.log(childSnapshot.val());

    var newTrainName = childSnapshot.val().train;
    var newTrainDestination = childSnapshot.val().destination;
    var newTrainTime = childSnapshot.val().firstTrainTime;
    var newFrequency = childSnapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var startTimeConverted = moment(newTrainTime, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % newFrequency;

    // Minute(s) Until Train
    var tMinutesTillTrain = newFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

      // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(newTrainName),
    $("<td>").text(newTrainDestination),
    $("<td>").text(newFrequency),
    $("<td>").text(catchTrain),
    $("<td>").text(tMinutesTillTrain),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
  },
    //Handle the errors
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
});
})