var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

var pokemon;

fs.readFileAsync(__dirname + '/pokemon.json','utf8')
  .then(renderJSON)
  .then(generateTeams);

function renderJSON(rawtext) {
  return JSON.parse(rawtext);
}

function generatePairings() {
  var matchups = [];

  // Generate all possible pairings
  for (var i = 0; i < pokemon.length; i++) {
    for (var j = 0; j < pokemon.length; j++) {
      matchups.push({'Trainer': pokemon[i].name, 'Opponent': pokemon[j].name});
    }
  }

  var toWrite = JSON.stringify(matchups);
  toWrite = toWrite.replace(/\[/g, '[\n');
  toWrite = toWrite.replace(/\]/g, '\n]');
  toWrite = toWrite.replace(/\{/g, '  {\n');
  toWrite = toWrite.replace(/\}/g, '\n  }');
  toWrite = toWrite.replace(/,/g, ',\n');
  toWrite = toWrite.replace(/:/g, ': ');
  toWrite = toWrite.replace(/"Trainer"/g, '    "Trainer"');
  toWrite = toWrite.replace(/"Opponent"/g, '    "Opponent"');

  fs.writeFileAsync(__dirname + '/matchups.json', toWrite)
    .then(function(){return 1;});
}

function generateTeams(poke) {
  pokemon = poke;

  var counter = 1;

  for (var i = 1; i < 151; i++) {


    for (var j = 1; j < 151; j++) {
      var currentdate = new Date();
      var datetime = "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

      console.log(datetime);

      for (var k = 1; k < 151; k++) {


        for (var l = 1; l < 151; l++) {


          for (var m = 1; m < 151; m++) {


            for (var n = 1; n < 151; n++) {
              counter = counter + 1;
            }
          }
        }
      }
    }
  }

  return counter;
}
