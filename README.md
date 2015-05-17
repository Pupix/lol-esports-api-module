# lol-esports-api-module
A wrapper module for League of Legends' eSports [API](http://na.lolesports.com/api/swagger). In the documentation below there will be references to the official methods used for each method.

All methods can be either used with a `callback` method or as a `promise`

## Download
lol-esports-api-module is installable via:

- [GitHub](https://github.com/Pupix/lol-esports-api-module) `git clone https://github.com/Pupix/lol-esports-api-module.git`
- [npm](https://www.npmjs.com/): `npm install lol-esports-api-module`


## Quick example
```js
var API = require('lol-esports-api-module'),
    api = new API();
```

### Using callbacks
```js
    api.getTeamById(684, function (err, data) {
        console.log(data);
    });
    =>  {
            "name": "SK Telecom T1",
            "bio": "SKT T1 was once considered...",
            "roster": {
                "players0": {
                    "playerId": "692",
                    "name": "Faker",
                    "role": "Mid Lane",
                    "isStarter": 1
                },
                ...
            },
            "logoUrl": "http://riot-web-cdn.s3-us-west-1.amazonaws.com/lolesports/s3fs-public/skt.png",
            "profileUrl": "http://euw.lolesports.com/node/684",
            "teamPhotoUrl": "http://euw.lolesports.com/",
            "acronym": "SKT"
        }
```

### Using promises
```js
    api.getTeamById(684).then(function (data) {
        console.log(data);
    });
    =>  {
            "name": "SK Telecom T1",
            "bio": "SKT T1 was once considered ...",
            "roster": {
                "players0": {
                    "playerId": "692",
                    "name": "Faker",
                    "role": "Mid Lane",
                    "isStarter": 1
                },
                ...
            },
            "logoUrl": "http://riot-web-cdn.s3-us-west-1.amazonaws.com/lolesports/s3fs-public/skt.png",
            "profileUrl": "http://euw.lolesports.com/node/684",
            "teamPhotoUrl": "http://euw.lolesports.com/",
            "acronym": "SKT"
        }
```

## Documentation

Whenever possible, if a configuration *Object* (referred as `opt` in the documentation) is not required the `callback` can be passed directly as first parameter to all methods.

### Methods

**Articles**
* [getNews](#getNews)

**Organizational**
* [getLeagues](#getLeagues)
* [getLeagueById](#getLeagueById)
* [getTournaments](#getTournaments)
* [getTournamentById](#getTournamentById)
* [getSchedule](#getSchedule)
* [getStandings](#getStandings)
* [getSeries](#getSeries)
* [getSeriesById](#getSeriesById)
* [getMatchById](#getMatchById)
* [getGameById](#getGameById)

**Static**
* [getTeamById](#getTeamById)
* [getPlayerById](#getPlayerById)

**Stats**
* [getFantasyStats](#getFantasyStats)
* [getStatLeaders](#getStatLeaders)
* [getTeamStats](#getTeamStats)
* [getPlayerStats](#getPlayerStats)
* [getAllPlayersStats](#getAllPlayersStats)
* [getAllPlayersStatsById](#getAllPlayersStatsById)
* [getAllPlayersChampionsById](#getAllPlayersChampionsById)

**Programming**
* [getProgramming](#getProgramming)
* [getProgrammingById](#getProgrammingById)
* [getProgrammingWeek](#getProgrammingWeek)

---------------------------------------

<a name="getNews" />
### getNews(opt, callback)

Returns the latest news from lolesports.

**Parameters**

1. **[opt] {Object}**
    * **[opt.limit] {number | string}** The maximum amount of news to return, if omitted, limit will default to 10, max of 50.
    * **[opt.offset] {number | string}** The numbers of articles to skip.
    * **[opt.category] {number | string}** The taxonomy identifier to filter results with. Omit to return all taxonomies.
    * **[opt.language] {string}** The language to limit the news articles to.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getLeagues" />
### getLeagues(callback)

Returns basic information on all existing leagues from lolesports.

**Parameters**

1. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getLeagueById" />
### getLeagueById(id, callback)

Returns basic information about a league on lolesports.

**Parameters**

1. **id {number | string}** ID of the league that needs to be fetched.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getTournaments" />
### getTournaments(callback)

Returns basic information on all existing tournaments from lolesports.

**Parameters**

1. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getTournamentById" />
### getTournamentById(id, callback)

Returns basic information about a tournament on lolesports.

**Parameters**

1. **id {number | string}** ID of the league that needs to be fetched.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getSchedule" />
### getSchedule(opt, callback)

Returns the schedule of matches for the specified tournament.

**Parameters**

1. **opt {Object}**
    * **opt.tournamentId {number | string}** ID of the tournament you want to use.
    * **[opt.teamId] {number | string}** ID of a team you want to view the schedule for.
    * **[opt.finished = true] {boolean}** Whether or not to include finished games.
    * **[opt.future = true] {boolean}** Whether or not to include future games.
    * **[opt.live = true] {boolean}** Whether or not to include live games.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getStandings" />
### getStandings(tournamentId, callback)

Returns the standings for the specified tournament.

**Parameters**

1. * **tournamentId {number | string}** ID of the tournament to be fetched.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getSeries" />
### getSeries(callback)

Returns basic information on all existing series from lolesports.

**Parameters**

1. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getSeriesById" />
### getSeriesById(id, callback)

Returns basic information about a series on lolesports.

**Parameters**

1. **id {number | string}** ID of the series that needs to be fetched.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getMatchById" />
### getMatchById(id, callback)

Returns basic information about a match including name, tournament information, and live streams.

**Parameters**

1. **id {number | string}** ID of the match that needs to be fetched.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getGameById" />
### getGameById(id, callback)

Returns basic information about a game including players, tournament information, and videos on demand.

**Parameters**

1. **id {number | string}** ID of the game that needs to be fetched.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getTeamById" />
### getTeamById(opt, callback)

Returns basic information about a team including players, name, and profile url on lolesports.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** ID of the team that needs to be fetched.
    * **[opt.expandPlayers] {boolean}** Instead of each player element returning limited data, fully expand each player element to contain the results of a player api call for that player.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getPlayerById" />
### getPlayerById(id, callback)

Returns basic information about a player including name, bio, and profile url.

**Parameters**

1. **id {number | string}** ID of the player that needs to be fetched.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getFantasyStats" />
### getFantasyStats(opt, callback)

Returns fantasy stats for entire tournament.

**Parameters**

1. **opt {Object}**
    * **opt.tournamentId {number | string}** Filter the stats returned to a particular tournament.
    * **[opt.dateBegin] {number | string}** Filter the start dates to a particular date.
        * Possible values: *timestamp in seconds | DateString | GMTString | ISOString | TimeString | UTCString*
    * **[opt.dateEnd] {number | string}** Filter the end dates to a particular date
        * Possible values: *timestamp in seconds | DateString | GMTString | ISOString | TimeString | UTCString*
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getStatLeaders" />
### getStatLeaders(opt, callback)

Returns the greatest stat for a particular tournament.

**Parameters**

1. **opt {Object}**
    * **opt.stat {string}** The desired stat.
        * Possible values: *"kda" | "killparticipation" | "gpm" | "totalgold" | "kills" | "deaths" | "assists" | "minionskilled"*
    * **opt.tournamentId {number | string}** ID of the tournament you want to use.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getTeamStats" />
### getTeamStats(opt, callback)

Returns a team's stats for the entire tournament or tournament series.

**Parameters**

1. **opt {Object}**
    * **opt.teamId {number | string}** The team that needs to be fetched.
    * **opt.tournamentId {number | string}** ID of the tournament you want to use, if omitted will return stats for all tournaments separated by tournament.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getPlayerStats" />
### getPlayerStats(opt, callback)

Returns a player's stats for the entire tournament or tournament series.

**Parameters**

1. **opt {Object}**
    * **opt.playerId {number | string}** The player that needs to be fetched.
    * **opt.tournamentId {number | string}** ID of the tournament you want to use, if omitted will return stats for all tournaments separated by tournament.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getAllPlayersStats" />
### getAllPlayersStats(tournamentId, callback)

Returns kda, average gold and gpm for all players of a specified tournament.

**Parameters**

1. **tournamentId {number | string}** ID of the tournament you want to use.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getAllPlayersStatsById" />
### getAllPlayersStatsById(opt, callback)

Returns kda, average gold and gpm for one player in a specified tournament.

**Parameters**

1. **opt {Object}**
    * **opt.playerId {number | string}** The player that needs to be fetched.
    * **opt.tournamentId {number | string}** ID of the tournament you want to use.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getAllPlayersChampionsById" />
### getAllPlayersChampionsById(opt, callback)

Returns kda, average gold and gpm on different champions for one player in a specified tournament.

**Parameters**

1. **opt {Object}**
    * **opt.playerId {number | string}** The player that needs to be fetched.
    * **opt.tournamentId {number | string}** ID of the tournament you want to use.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getProgramming" />
### getProgramming(opt, callback)

Returns all programming blocks.

**Parameters**

1. **opt {Object}**
    * **[opt.method = 'all'] {string}** The method to execute.
        * Possible values: *"all" | "time" | "next" | "prev"*
    * **[opt.winner] {boolean}** Include winner.
    * **[opt.expandMatches] {boolean}** Fully expand each matches element.
    * **[opt.time] {number | string}** The time to start for programming blocks.
    * **[opt.limit] {number | string}** The limit of the blocks to return. Only applicable to 'next' and 'prev' methods.
    * **[opt.tournamentId] {number | string}** The tournament to be fatched.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getProgrammingById" />
### getProgrammingById(opt, callback)

Returns a programming block.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** The id of the programming block.
    * **[opt.expandMatches] {boolean}** Instead of each matches element returning a simple array of integers, fully expand each matches element to contain the results of a match api call for each match found.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getProgrammingWeek" />
### getProgrammingWeek(opt, callback)

Returns a weeks programming blocks.

**Parameters**

1. **opt {Object}**
    * **opt.date {string}** The method to execute.
        * Possible values: *Date following YYY-MM-DD format*
    * **[opt.offset] {number | string}** Date offset.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.
