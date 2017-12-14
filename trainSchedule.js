console.log("hello");

var config = {
    apiKey: "AIzaSyARwafEqSWYliKOg6gg_RmN89TbMS70gbA",
    authDomain: "train-scheduler-5c843.firebaseapp.com",
    databaseURL: "https://train-scheduler-5c843.firebaseio.com",
    projectId: "train-scheduler-5c843",
    storageBucket: "train-scheduler-5c843.appspot.com",
    messagingSenderId: "1091338531703"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function(){
  	var name = $("#trainName").val().trim();
  	var destination = $("#destination").val().trim();
  	var firstTrain = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
  	var frequency = $("#frequency").val().trim();
  	// console.log(firstTrain);
  	

  	var newTrain = {
  		name: name,
  		destination: destination,
  		firstTrain: firstTrain,
  		frequency: frequency

  	}
  	database.ref().push(newTrain);

  	// console.log(newTrain.name);
  	// console.log(newTrain.destination);
  	// console.log(newTrain.firstTrain);
  	// console.log(newTrain.frequency);
  	
  	$("#trainName").val("");
  	$("#destination").val("");
  	$("#trainTime").val("");
  	$("#frequency").val("");

  	alert("Train Added");

  	return false;
  })

  database.ref().on("child_added",function(snapshot){
  	var childName = snapshot.val().name;
  	var childDestination = snapshot.val().destination;
  	var childFrequency = snapshot.val().frequency;
  	var childFirstTrain = snapshot.val().firstTrain;

  	console.log("Name: " + childName);
  	console.log("Destination: " + childDestination);
  	console.log("Frequency: " + childFrequency);
  	console.log("First Train Time: " + childFirstTrain);

  	var remainder = moment().diff(moment.unix(childFirstTrain),"minutes")%childFrequency;
  	var minutes = childFrequency - remainder;
  	var arrivalTime = moment().add(minutes, "m").format("hh:mm A");

  	console.log("Time remaining is " + remainder);
  	console.log("Minutes: " + minutes);
  	console.log("Arrival Time: " + arrivalTime);

  	$("#train-table > tBody").append("<tr><td>"
        + childName + "</td><td>"
        + childDestination + "</td><td>"
        + childFrequency + "</td><td>"
        + arrivalTime + "</td><td>"
        + minutes + "</td></tr>");
  })

  