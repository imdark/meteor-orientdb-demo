OrientDB  Leaderboard Example
=============================

## install

###Prerequisites:
* node.js [https://nodejs.org/](https://nodejs.org/)
* Meteor.js [https://www.meteor.com/install](https://www.meteor.com/install)
* orientdb [http://orientdb.com/download/](http://orientdb.com/download/)

Start the orientDB server by running c:\orientInstall\bin\server.bat on windows or ~/orientInstall/bin/server.sh on linux and browse to localhost:2480
you will also need the provide an orientDb user and password for this demo to work, you choose them when first running the server.bat file, you need to add them to the top of server/server.js
like so:

```js

var orientdb = new Meteor.LiveOrientDB({
  host: 'localhost',
  port: '2424',
  username: 'root',
  password: '12123333',
  database: 'players'
});


```


## References
* [https://github.com/orientechnologies/orientdb/issues/3602](The original github issue)
* [https://github.com/orientechnologies/orientdb-docs/blob/master/Live-Query.md#livequery-in-nodejs](documentation explaining the use of live query in orientdev docs)
