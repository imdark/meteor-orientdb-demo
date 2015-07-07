
var orientdb = new Meteor.LiveOrientDB({
  host: 'localhost',
  port: '2424',
  username: 'root',
  password: '12123333',
  database: 'players'
});

Meteor.publish('test', function() {
  return orientdb.select(
    'select * from players order by score desc', { params: { table: "player" } }
  );
});

// Meteor.publish('allPlayers', function(){
//   return orientdb.select(
//     'SELECT * FROM players ORDER BY score DESC',
//     {params:{ table: 'player' } }
//   );
// });

// Meteor.publish('playerScore', function(name){
//   return orientdb.select(
//     'SELECT id, score FROM players WHERE name = ' + liveDb.db.escape(name),
//     [
//       {
//         table: 'players',
//         condition: function(row, newRow){
//           return row.name === name;
//         }
//       }
//     ]
//   );
// });

Meteor.methods({
  'incScore': function(options) {
    console.log(options)
      orientdb.execute('update players set score=:score where name=:name', {params:options});
    }
  });
//     },
//   'delScore': function(){
//       orientdb.execute('DELETE vertex from players where name=:name', {params:{name:'abc'}});
//     },

//   'updScore': function(options){
//       orientdb.execute('UPDATE #12:1 SET score=:score', options);
//     },
// });
