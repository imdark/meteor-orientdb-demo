OrientDB  Leaderboard Example
=============================

## install

###Prerequisites:
* node.js [https://nodejs.org/](https://nodejs.org/)
* Meteor.js [https://www.meteor.com/install](https://www.meteor.com/install)
* orientdb [http://orientdb.com/download/](http://orientdb.com/download/)

I tested this on orientdb-community-2.1.rc5,
* First you need to install a jre/jdk, 1.8 would do [http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)
* Download and extract orientDB from [http://orientdb.com/download/](http://orientdb.com/download/)
* You need to enable live query in the orientDb xml.

add/replace this to c:\orientInstallpath\config\orientdb-server-config.xml under <handlers>

```xml

<handler class="com.orientechnologies.orient.server.plugin.livequery.OLiveQueryPlugin">
    <!-- EXPERIMENTAL FEATURE, enable at your own risk -->
    <parameters>
        <parameter name="enabled" value="true"/>
    </parameters>
</handler>

``` 
* Start the orientDB server by running c:\orientInstallpath\bin\server.bat on windows or ~/orientInstallpath/bin/server.sh on linux
* you will also need the provide an orientDb user and password for this demo to work, you choose them when first running the server.bat file
* Point your browser to localhost:2480 this website is a frontend for orientDb web ui.
* Populate the db with data running each of the lines in 'leaderboard.sql', you need to run each of them separately.
* Add/Replace the previously mentioned user and password to the top of server/server.js
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
* [https://github.com/orientechnologies/orientdb-docs/blob/master/Live-Query.md](documentation explaining the use of live query in orientDB docs)

## version notes
-7/7/2015- the demo does work fully now and synchronizes scores across multiple sessions using live query.
it is very hacky and there are a few limitation in the orient db live query api that will make it nearly impossible to make it truly generic.
orientdb live query does not return the 'rid' of the row making it necessary to make up my own generic id column (i used names in this case), this might be a bug in orientjs.
it also does not return updates in the location of the returned record in an ordered query or allow for rownum as a virtual column, making it a must for the client/meteor server sort the data manually after the network boundary.
also it only works using the experimental branch of orientdb so production use would not be smart