// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. 
// This route will also be used to handle the compatibility logic.

var profiles = require("../data/simpsons");

module.exports = function(app) {

app.post("/api/tables", function(req, res) { 
    
    var userInput = req.body["scores[]"];
    var difference = []; 
    var lowestNumber = [];
    var indexNumber = "";
    
    profiles.map(function(arr){
        var totalDifference = [];   
        for (let i=0; arr.scores.length>i;i++) {
                totalDifference.push(Math.abs((arr.scores[i])-(userInput[i])));
    
        };
        var x = totalDifference.reduce(function(acc, val){
            return acc + val;
        })
           difference.push(x);
           lowestNumber.push(x);
        
    });
    
    var lowLowestNumber= lowestNumber.sort(function(a, b){return a - b});
    
    for (let i=0; lowestNumber.length>i;i++) {
        if(difference[i]===lowLowestNumber[0]){
            indexNumber = [i];       
        }  
    }
    
    var mostSimilarName = profiles[indexNumber].name;
    var mostSimilarPhoto = profiles[indexNumber].photo;

    var bestMatch = {name: mostSimilarName, pic: mostSimilarPhoto};

    // // console.log(mostSimilarName);
    // // console.log(mostSimilarPhoto);

    var scores = req.body["scores[]"]

    scores = scores.map(function (num){
       return parseInt(num); 
    });

    profiles.push({
        name: req.body.name,
        photo: req.body.photo,
        scores: scores
    });

    res.json(bestMatch);
});

app.get("/api/tables", function(req, res) {
    res.json(profiles);
  
});


};