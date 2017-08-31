// /* global firebase moment */
// // Steps to complete:

// // 1. Initialize Firebase
// // 2. Create button for adding new employees - then update the html + update the database
// // 3. Create a way to retrieve employees from the employee database.
// // 4. Create a way to calculate the months worked. Using difference between start and current time.
// //    Then use moment.js formatting to set difference in months.
// // 5. Calculate Total billed

// // 1. Initialize Firebase
// var config = {
//   apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
//   authDomain: "time-sheet-55009.firebaseapp.com",
//   databaseURL: "https://time-sheet-55009.firebaseio.com",
//   storageBucket: "time-sheet-55009.appspot.com"
// };

// firebase.initializeApp(config);

// var database = firebase.database();

// // 2. Button for adding Employees
// $("#add-employee-btn").on("click", function(event) {
//   event.preventDefault();

//   // Grabs user input
//   var empName = $("#employee-name-input").val().trim();
//   var empRole = $("#role-input").val().trim();
//   var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
//   var empRate = $("#rate-input").val().trim();

//   // Creates local "temporary" object for holding employee data
//   var newEmp = {
//     name: empName,
//     role: empRole,
//     start: empStart,
//     rate: empRate
//   };

//   // Uploads employee data to the database
//   database.ref().push(newEmp);

//   // Logs everything to console
//   console.log(newEmp.name);
//   console.log(newEmp.role);
//   console.log(newEmp.start);
//   console.log(newEmp.rate);

//   // Alert
//   alert("Employee successfully added");

//   // Clears all of the text-boxes
//   $("#employee-name-input").val("");
//   $("#role-input").val("");
//   $("#start-input").val("");
//   $("#rate-input").val("");
// });

// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function(childSnapshot, prevChildKey) {

//   console.log(childSnapshot.val());

//   // Store everything into a variable.
//   var empName = childSnapshot.val().name;
//   var empRole = childSnapshot.val().role;
//   var empStart = childSnapshot.val().start;
//   var empRate = childSnapshot.val().rate;

//   // Employee Info
//   console.log(empName);
//   console.log(empRole);
//   console.log(empStart);
//   console.log(empRate);

//   // Prettify the employee start
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

//   // Add each train's data into the table
//   $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
//   empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
// });

// // Example Time Math
// // -----------------------------------------------------------------------------
// // Assume Employee start date of January 1, 2015
// // Assume current date is March 1, 2016

// // We know that this is 15 months.
// // Now we will create code in moment.js to confirm that any attempt we use mets this test case

//    <input id="train-name">
// <input id="train-destination">
// <input id="first-arrival">
// <input id="frequency">

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


