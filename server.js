var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync(__dirname + '/pokemon.json','utf8')
  .then(renderJSON)
  .then(generatePairings);

function renderJSON(rawtext) {
  return JSON.parse(rawtext);
}

function generatePairings(pokemon) {
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