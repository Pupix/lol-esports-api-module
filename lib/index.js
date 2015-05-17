/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    // Vars
    var XP        = require('expandjs'),
        Requester = require('xp-request');
    /**
     * Websocket for live updates TODO
     *
     * ws://livestats-edge-proxy.dev.lolesports.com:9300/stats
     */

    /**************************************************************************/

    /**
     * Generates a request URL from a string with placeholders and the option object
     *
     * @param {string} url - the url with placeholders
     * @param {Object} opt - the map with the placeholders values
     */
    function generateURL(url, opt) {
        var keys = XP.match(url, /\{(\w+)\}/g);

        XP.forEach(keys, function (key) {
            url = url.replace(key, opt[XP.trim(key, '{}')]);
        });

        return url;
    }

    /**************************************************************************/

    /**
     * A wrapper for League of Legends' eSports API
     *
     * @class RiotAPI
     * @type {Function}
     */
    module.exports = new XP.Class('eSportsAPI', {

        /**
         * Returns the latest news from lolesports
         *
         * @method getNews
         * @param {Object} [opt]
         *   @param {number | string} [opt.limit] The maximum amount of news to return, if omitted, limit will default to 10, max of 50
         *   @param {number | string} [opt.offset] The numbers of articles to skip
         *   @param {number | string} [opt.category] The taxonomy identifier to filter results with. Omit to return all taxonomies.
         *   @param {string} [opt.language] The language to limit the news articles to.
         * @param {Function} [cb]
         * @promise
         */
        getNews: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.url_ = '/news.json';

                //Setting
                opt.query_ = {};
                opt.query_.limit = opt.limit;
                opt.query_.offset = opt.offset;
                opt.query_.taxonomyId = opt.category;
                opt.query_.lang = opt.language;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Returns basic information on all existing leagues
         *
         * @method getLeagues
         * @param {Function} [cb]
         * @promise
         */
        getLeagues: {
            promise: true,
            value: function (cb) {

                //Checking
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 1, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/league.json';

                //Setting
                opt.query_ = {};
                opt.query_['parameters[method]'] = 'all';

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns basic information about a league
         *
         * @method getLeagueById
         * @param {number | string} id ID of the league that needs to be fetched
         * @param {Function} [cb]
         * @promise
         */
        getLeagueById: {
            promise: true,
            value: function (id, cb) {

                //Checking
                XP.assertArgument(XP.isString(id) || XP.isNumber(id), 1, 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/league/{leagueId}.json';

                //Setting
                opt.query_ = {};
                opt.leagueId = id;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Returns basic information about all tournaments including contestants, and beginning and end dates
         *
         * @method getTournaments
         * @param {Function} [cb]
         * @promise
         */
        getTournaments: {
            promise: true,
            value: function (cb) {

                //Checking
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 1, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/tournament.json';

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns basic information about a tournament including contestants, and beginning and end dates
         *
         * @method getTournamentById
         * @param {number | string} id ID of the tournament that needs to be fetched
         * @param {Function} [cb]
         * @promise
         */
        getTournamentById: {
            promise: true,
            value: function (id, cb) {

                //Checking
                XP.assertArgument(XP.isNumber(id) || XP.isString(id), 1, 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/tournament/{tournamentId}.json';

                //Setting
                opt.tournamentId = id;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Returns basic information on all existing series
         *
         * @method getSeries
         * @param {Function} [cb]
         * @promise
         */
        getSeries: {
            promise: true,
            value: function (cb) {

                //Checking
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 1, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/series.json';

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns basic information about a series
         *
         * @method getSeriesById
         * @param {number | string} id ID of the series that needs to be fetched
         * @param {Function} [cb]
         * @promise
         */
        getSeriesById: {
            promise: true,
            value: function (id, cb) {

                //Checking
                XP.assertArgument(XP.isString(id) || XP.isNumber(id), 1, 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/series/{seriesId}.json';

                //Setting
                opt.seriesId = id;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Returns basic information about a match including name, tournament information, and live streams
         *
         * @method getMatchById
         * @param {number | string} id ID of the match that needs to be fetched
         * @param {Function} [cb]
         * @promise
         */
        getMatchById: {
            promise: true,
            value: function (id, cb) {

                //Checking
                XP.assertArgument(XP.isString(id) || XP.isNumber(id), 1, 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/match/{matchId}.json';

                //Setting
                opt.matchId = id;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns basic information about a game including players, tournament information, and videos on demand
         *
         * @method getGameById
         * @param {number | string} id ID of the game that needs to be fetched
         * @param {Function} [cb]
         * @promise
         */
        getGameById: {
            promise: true,
            value: function (id, cb) {

                //Checking
                XP.assertArgument(XP.isString(id) || XP.isNumber(id), 1, 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/game/{gameId}.json';

                //Setting
                opt.gameId = id;

                this.doRequest(opt, cb);
            }
        },
        /**********************************************************************/

        /**
         * Returns basic information about a team including players, name, and profile url
         *
         * @method getTeamById
         * @param {Object} opt
         *   @param {number | string} opt.id ID of the team that needs to be fetched
         *   @param {boolean} [opt.expandPlayers] Instead of each player element returning limited data, fully expand each player element to contain the results of a player api call for that player.
         * @param {Function} [cb]
         * @promise
         */
        getTeamById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isString(opt.id), 'opt.id', 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/team/{teamId}.json';

                //Setting
                opt.query_ = {};
                opt.query_.expandPlayers = XP.toBoolean(opt.expandPlayers);
                opt.teamId = opt.id;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns basic information about a player including name, bio, and profile url
         *
         * @method getPlayerById
         * @param {number | string} id ID of the player that needs to be fetched
         * @param {Function} [cb]
         * @promise
         */
        getPlayerById: {
            promise: true,
            value: function (id, cb) {

                //Checking
                XP.assertArgument(XP.isString(id) || XP.isNumber(id), 1, 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/player/{playerId}.json';

                //Setting
                opt.playerId = id;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Returns basic information about a series on lolesports
         *
         * @method getGameById
         * @param {Object} opt
         *   @param {number | string} opt.tournamentId
         *   @param {number | string} [opt.dateBegin] Filter the start dates to a particular date (timestamp in seconds, DateString, GMTString, ISOString, TimeString or UTCString)
         *   @param {number | string} [opt.dateEnd] Filter the end dates to a particular date (timestamp in seconds, DateString, GMTString, ISOString, TimeString or UTCString)
         * @param {Function} [cb]
         * @promise
         */

        getFantasyStats: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isString(opt.tournamentId) || XP.isNumber(opt.tournamentId), 'opt.tournamentId', 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/gameStatsFantasy.json';

                //Setting
                opt.query_ = {};
                opt.query_.tournamentId = opt.tournamentId;
                opt.query_.dateBegin = XP.isNumeric(opt.dateBegin) ? opt.dateBegin : Date.parse(opt.dateBegin);
                opt.query_.dateEnd = XP.isNumeric(opt.dateEnd) ? opt.dateEnd : Date.parse(opt.dateEnd);

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Returns the schedule of matches for the specified tournament
         *
         * @method getSchedule
         * @param {Object} opt
         *   @param {number | string} opt.tournamentId ID of the tournament you want to use.
         *   @param {number | string} [opt.teamId] ID of a team you want to view the schedule for.
         *   @param {boolean} [opt.finished = true] Whether or not to include finished games.
         *   @param {boolean} [opt.future = true] Whether or not to include future games.
         *   @param {boolean} [opt.live = true] Whether or not to include live games.
         * @param {Function} [cb]
         * @promise
         */
        getSchedule: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isNumber(opt.tournamentId) || XP.isString(opt.tournamentId), 'opt.tournamentId', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/schedule.json';

                //Setting
                opt.query_ = {};
                opt.query_.tournamentId = opt.tournamentId;
                opt.query_.teamId = opt.teamId;
                opt.query_.includeFinished = XP.isVoid(opt.finished) ? null : XP.toBoolean(opt.finished);
                opt.query_.includeFuture = XP.isVoid(opt.future) ? null : XP.toBoolean(opt.finished);
                opt.query_.includeLive = XP.isVoid(opt.live) ? null : XP.toBoolean(opt.finished);

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Returns the standings for a particular tournament
         *
         * @method getStandings
         * @param {number | string} [tournamentId] ID of the tournament you want to use, if omitted it will use the current tournament
         * @param {Function} [cb]
         * @promise
         */
        getStandings: {
            promise: true,
            value: function (tournamentId, cb) {

                //Checking
                XP.assertArgument(XP.isString(tournamentId) || XP.isNumber(tournamentId) || XP.isVoid(tournamentId), 1, 'number, string or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/standings.json';

                //Setting
                opt.query_ = {};
                opt.query_.tournamentId = tournamentId;
                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Returns the greatest stat for a particular tournament
         *
         * @method getStatLeaders
         * @param {Object} opt
         *   @param {string} opt.stat The desired stat, amongst one of the following: kda, killparticipation, gpm, totalgold, kills, deaths, assists, minionskilled
         *   @param {number | string} opt.tournamentId ID of the tournament you want to use.
         * @param {Function} [cb]
         * @promise
         */
        getStatLeaders: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isString(opt.stat), 'opt.stat', 'string');
                XP.assertOption(XP.isString(opt.tournamentId) || XP.isNumber(opt.tournamentId), 'opt.tournamentId', 'number | string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/statLeaders.json';

                //Setting
                opt.query_ = {};
                opt.query_.stat = opt.stat;
                opt.query_.tournamentId = opt.tournamentId;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/


        /**
         * Returns a team's stats for the entire tournament or tournament series
         *
         * @method getTeamStats
         * @param {Object} opt
         *   @param {number | string} opt.teamId Filter the stats returned to a particular team
         *   @param {number | string} [opt.tournamentId] ID of the tournament you want to use, if omitted will return stats for all tournaments separated by tournament
         * @param {Function} [cb]
         * @promise
         */
        getTeamStats: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isString(opt.teamId), 'opt.teamId', 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/teamStats.json';

                //Setting
                opt.query_ = {};
                opt.query_.teamId = opt.teamId;
                opt.query_.tournamentId = opt.tournamentId;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns a player's stats for the entire tournament or tournament series
         *
         * @method getPlayerStats
         * @param {Object} opt
         *   @param {number | string} opt.playerId Filter the stats returned to a particular player
         *   @param {number | string} [opt.tournamentId] ID of the tournament you want to use, if omitted it will use the current tournament and provide stats for all tournaments player has played in
         * @param {Function} [cb]
         * @promise
         */
        getPlayerStats: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isString(opt.playerId), 'opt.playerId', 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/playerStats.json';

                //Setting
                opt.query_ = {};
                opt.query_.playerId = opt.playerId;
                opt.query_.tournamentId = opt.tournamentId;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns kda, average gold and gpm for all players
         *
         * @method getAllPlayersStats
         * @param {number | string} [tournamentId] ID of the tournament you want to use, if omitted it will use the current tournament
         * @param {Function} [cb]
         * @promise
         */
        getAllPlayersStats: {
            promise: true,
            value: function (tournamentId, cb) {

                //Checking
                XP.assertArgument(XP.isString(tournamentId) || XP.isNumber(tournamentId) || XP.isVoid(tournamentId), 1, 'string, number or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                var opt = {};
                opt.url_ = '/all-player-stats.json';

                //Setting
                opt.query_ = {};
                opt.query_.tournamentId = tournamentId;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns kda, average gold and gpm for one player
         *
         * @method getAllPlayersStatsById
         * @param {Object} opt
         *   @param {number | string} opt.playerId Filter the stats to a particular player
         *   @param {number | string} opt.tournamentId Filter the stats returned to a particular tournament
         * @param {Function} [cb]
         * @promise
         */
        getAllPlayersStatsById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isString(opt.playerId) || XP.isNumber(opt.playerId), 'opt.playerId', 'string or number');
                XP.assertOption(XP.isString(opt.tournamentId) || XP.isNumber(opt.tournamentId), 'opt.tournamentId', 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/all-player-stats/{playerId}.json';

                //Setting
                opt.query_ = {};
                opt.query_.tournamentId = opt.tournamentId;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns kda, average gold and gpm for one player
         *
         * @method getAllPlayersChampionsById
         * @param {Object} opt
         *   @param {number | string} opt.playerId Filter the stats to a particular player
         *   @param {number | string} opt.tournamentId Filter the stats returned to a particular tournament
         * @param {Function} [cb]
         * @promise
         */
        getAllPlayersChampionsById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isString(opt.playerId) || XP.isNumber(opt.playerId), 'opt.playerId', 'string or number');
                XP.assertOption(XP.isString(opt.tournamentId) || XP.isNumber(opt.tournamentId), 'opt.tournamentId', 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/all-player-champs/{playerId}.json';

                //Setting
                opt.query_ = {};
                opt.query_.tournamentId = opt.tournamentId;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Returns all programming blocks
         *
         * @method getProgramming
         * @param {Object} [opt]
         *   @param {string} [opt.method] The method to execute
         *   @param {boolean} [opt.winner] Include winner
         *   @param {boolean} [opt.expandMatches] Fully expand each matches element
         *   @param {number | string} [opt.time] The time to start for programming blocks
         *   @param {number | string} [opt.limit] The limit of the blocks to return. Only applicable to 'next' and 'prev' methods
         *   @param {number | string} [opt.tournamentId] The tournament to be fatched
         * @param {Function} [cb]
         * @promise
         */
        getProgramming: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/programming.json';

                //Setting
                opt.query_ = {};
                opt.query_['parameters[method]'] = XP.isVoid(opt.method) ? 'all' : opt.method;
                opt.query_['parameters[winner]'] = opt.winner ? 1 : null;
                opt.query_['parameters[expand_matches]'] = opt.expandMatches ? 1 : null;
                // Figure out what kind of `time` is needed TODO
                opt.query_['parameters[time]'] = null;
                opt.query_['parameters[limit]'] = opt.limit;
                opt.query_['parameters[tournament]'] = opt.tournamentId;
                opt.playerId = opt.id;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns a programming block
         *
         * @method getProgrammingById
         * @param {Object} [opt]
         *   @param {number | string} opt.id The ID of the programming block
         *   @param {boolean} [opt.expandMatches] Fully expand each matches element
         * @param {Function} [cb]
         * @promise
         */
        getProgrammingById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isString(opt.id), 'opt.id', 'string or number');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/programming/{id}.json';

                //Setting
                opt.query_ = {};
                opt.expand_matches = opt.expandMatches ? 1 : null;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Returns a week's programming blocks
         *
         * @method getProgrammingWeek
         * @param {Object} opt
         *   @param {string} opt.date The date to start (YYYY-MM-DD)
         *   @param {number | string} [opt.offset] A date offset ([-]NNNN)
         * @param {Function} [cb]
         * @promise
         */
        getProgrammingWeek: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertOption(XP.isString(opt.date), 'opt.date', 'string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.url_ = '/programmingWeek/{date}/{offset}.json';

                //Setting
                opt.offset = opt.offset || 0;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        doRequest: {
            value: function (opt, cb) {
                var url,
                    request;

                //Setting
                opt.url_   = 'http://euw.lolesports.com:80/api' + opt.url_;
                opt.query_ = opt.query_ || {};

                //Creating URL
                url = generateURL(opt.url_, opt);
                url = XP.toURL(url, opt.query_);

                //Setting request
                request = new Requester({dataType: 'json', url: url});

                request.on('data', function (data, req) {
                    if (req.response.statusCode === 200) {
                        cb(null, data);
                    } else {
                        cb({error: req.response.statusCode, message: req.response.statusMessage}, null);
                    }
                });

                request.on('fail', function (err, req) {
                    var error = {
                        status: 'Unknown',
                        message: 'Couldn\'t resolve the request'
                    };

                    if (req.response) {
                        error.status = req.response.statusCode;
                        error.message = req.response.statusMessage;
                    }

                    cb({error: error.status, message: error.message}, null);
                });

                request.send();
            }
        }

    });

}());