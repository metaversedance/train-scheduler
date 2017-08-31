  var config = {
    apiKey: "AIzaSyBIgKVRPhpnQ4g9C0gRfuc4QRna-0CkTEk",
    authDomain: "train-scheduler-db03c.firebaseapp.com",
    databaseURL: "https://train-scheduler-db03c.firebaseio.com",
    projectId: "train-scheduler-db03c",
    storageBucket: "train-scheduler-db03c.appspot.com",
    messagingSenderId: "454973611470"
  };
  firebase.initializeApp(config);
  var database =  firebase.database()


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var data = childSnapShot.val();




  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + data.name + "</td><td>" + data.destination + "</td><td>" +
  data.frequency + "</td><td>" + data.firstArrivalTime + "</td><td>" + data.minutesTillNextTrain + "</td><td>" + data.nextArrival + "</td></tr>");


});


$("#submit-bttn").on("click",function(e){
    e.preventDefault()
    var name = $("#train-name").val().trim();
    var destination =  $("#train-destination").val().trim();

    var tFrequency = parseInt($("#frequency").val());

    // Time is 3:30 AM
    var firstArrivalTime = $("#first-arrival").val().trim();


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstArrivalTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var trainObj = {
        name: name,
        destination: destination,
        frequency: tFrequency,
        firstArrivalTime: firstArrivalTime,
        minutesTillNextTrain: tMinutesTillTrain,
        nextArrival: nextTrain
    }
    console.log(trainObj)
    database.ref().push(trainObj)


})


