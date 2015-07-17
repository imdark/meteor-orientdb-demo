
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

Meteor.methods({
  'incScore': function(options) {
      orientdb.execute('update players set score=:score where @rid=:rid', { params:options });
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
