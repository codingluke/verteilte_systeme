'use strict';

var debug = require('diagnostics')('raft')
  , argv = require('argh').argv
  , LifeRaft = require('liferaft')
  , net = require('net');

//
// Create a custom Raft instance which uses a plain TCP server and client to
// communicate back and forth.
//
var TCPRaft = LifeRaft.extend({
  /**
   * Reference our socket.
   *
   * @type {Msg}
   * @private
   */
  socket: null,

  /**
   * Initialized, start connecting all the things.
   *
   * @param {Object} options Options.
   * @api private
   */
  initialize: function initialize(options) {
    var raft = this;

    var server = net.createServer(function incoming(socket) {
      socket.on('data', function (buff) {
        var data = JSON.parse(buff.toString());

        debug(raft.address +':packet#data', data);
        raft.emit('data', data, function reply(data) {
          debug(raft.address +':packet#reply', data);
          socket.write(JSON.stringify(data));
          socket.end();
        });
      });
    }).listen(this.address);

    this.once('end', function enc() {
      server.close();
    });
  },

  /**
   * The message to write.
   *
   * @TODO implement indefinitely sending of packets.
   * @param {Object} packet The packet to write to the connection.
   * @param {Function} fn Completion callback.
   * @api private
   */
  write: function write(packet, fn) {
    var socket = net.connect(this.address)
      , raft = this;

    debug(raft.address +':packet#write', packet);
    socket.on('error', fn);
    socket.on('data', function (buff) {
      var data;

      try { data = JSON.parse(buff.toString()); }
      catch (e) { return fn(e); }

      debug(raft.address +':packet#callback', packet);
      fn(undefined, data);
    });

    socket.setNoDelay(true);
    socket.write(JSON.stringify(packet));
  }
});

//
// We're going to start with a static list of servers. A minimum cluster size is
// 4 as that only requires majority of 3 servers to have a new leader to be
// assigned. This allows the failure of one single server.
//
var ports = [
  8081, 8082,
  8083, 8084,
  8085, 8086
];

//
// The port number of this Node process.
//
var port = +argv.port || ports[0];

//
// Now that we have all our variables we can safely start up our server with our
// assigned port number.
//
var raft = new TCPRaft(port, {
  'election min': 1000,
  'election max': 2000,
  'heartbeat': 500
});

raft.on('heartbeat timeout', function () {
  debug('heart beat timeout, starting election');
});

raft.on('term change', function (to, from) {
  debug('were now running on term %s -- was %s', to, from);
}).on('leader change', function (to, from) {
  debug('we have a new leader to: %s -- was %s', to, from);
}).on('state change', function (to, from) {
  debug('we have a state to: %s -- was %s', to, from);
});

raft.on('leader', function () {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log('I am elected as leader');
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
});

raft.on('candidate', function () {
  console.log('----------------------------------');
  console.log('I am starting as candidate');
  console.log('----------------------------------');
});

//
// Join in other nodes so they start searching for each other.
//
ports.forEach(function join(nr) {
  if (!nr || port === nr) return;

  raft.join(nr);
});

