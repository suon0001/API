process.env.NODE_ENV = 'test';

const Sign = require('../models/sign');
const User = require('../models/user');

before((done) => {
    Sign.deleteMany({}, function(err) {});
    //User.deleteMany({}, function(err) {});

    done();
});

after((done) => {
    //User.deleteMany({}, function(err) {});
    //Sign.deleteMany({}, function(err) {});

    done();
});