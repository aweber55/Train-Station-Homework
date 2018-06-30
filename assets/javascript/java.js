// $(document).ready(function() {
    console.log("hello");




    var config = {
        apiKey: "AIzaSyDgT1NBlPqm1TFAxBDcSM9TLsD56dQJXJI",
        authDomain: "trainstation-505e7.firebaseapp.com",
        databaseURL: "https://trainstation-505e7.firebaseio.com",
        projectId: "trainstation-505e7",
        storageBucket: "",
        messagingSenderId: "902228506188"
    };
    firebase.initializeApp(config);
    
    
    
    var database = firebase.database();
    
    $("#addUser").on("click", function () {
        event.preventDefault();
        var trainName = $("#addTrain").val().trim();
        var destination = $("#dest").val().trim();
        var firstT = $("#firstTime").val().trim();
        var freq = $("#freq").val().trim();
    
        // console.log(trainName);
        // console.log(destination);
        // console.log(firstT);
        // console.log(freq);
    
        var newTrain = {
            fireTrain: trainName,
            fireDestination: destination,
            fireFirstOne: firstT,
            fireFreq: freq,
            currentTime: firebase.database.ServerValue.TIMESTAMP,
    
        };
        console.log(newTrain);
        database.ref().push(newTrain);
        console.log(newTrain.fireTrain);
        console.log(newTrain.fireDestination);
        console.log(newTrain.fireFirstOne);
        console.log(newTrain.currentTime);
        console.log(newTrain.fireFreq);
        $("#addTrain").val("");
        $("#dest").val("");
        $("#firstTime").val("");
        $("#freq").val("");
        return false;
    
    })
    
    database.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val());
        var trainName = snapshot.val().fireTrain;
        var destination = snapshot.val().fireDestination;
        var firstT = snapshot.val().fireFirstOne;
        var freq = snapshot.val().fireFreq;
    
        // var convertedDate = moment(firstT, "HH:mm");
        var nowMoment = moment();
        // console.log(convertedDate);
        // console.log(moment(convertedDate).format("HH:mm"));
    
    
        var firstTrainMoment = moment(firstT, 'HH:mm').subtract(1, "years");
    
    
        var nowMoment = moment(); 
        console.log("CURRENT TIME: " + moment(nowMoment).format("hh:mm"));
        console.log(nowMoment);
    
        var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
        console.log("DIFFERENCE IN TIME: " + minutesSinceFirstArrival);
    
        var minutesSinceLastArrival = minutesSinceFirstArrival % freq;
        console.log(minutesSinceFirstArrival);
    
        var minutesAway = freq - minutesSinceLastArrival;
        console.log("MINUTES TILL TRAIN: " + minutesAway);
    
    
        var nextArrival = nowMoment.add(minutesAway, 'minutes');
    
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
        
        var formatNextArrival = nextArrival.format("HH:mm");
    
    
        var tr = $('<tr>');
        var a = $('<td>');
        var b = $('<td>');
        var c = $('<td>');
        var d = $('<td>');
        var e = $('<td>');
        a.append(trainName);
        b.append(destination);
        c.append(freq);
        d.append(formatNextArrival);
        e.append(minutesAway);
        tr.append(a).append(b).append(c).append(d).append(e);
        $('#newTrains').append(tr);
    
    
    })
    
    
    
    
    