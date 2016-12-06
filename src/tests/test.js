require('babel-register')({
	"presets":["es2015"]
});

// var axios = require('axios');
var Actions = require('../js/store/actions').addContact;

var tape = require('tape');
var tapes = require('tapes');
var test = tapes(tape);

test('Test Actions', function (t) {
    //t.equal( typeof(AddContact), 'function' );
    t.end();
});