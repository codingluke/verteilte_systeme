request = require("supertest");
app = require("../app");
mongoose = require("mongoose");
mongoose.connection.collections['users'].drop( function(err) {
    console.log('collection dropped');
});

describe('GET /', function() {
    it('should contain text "Hello, Express!"', function (done) {
        request(app)
            .get('/')
            .expect(/Welcome to/)
            .end(function(err, req) {
                console.log(req.body);
                done();
            });
    });
});

describe('POST /users', function() {
    it('should create a user', function (done) {
        var data = {
            name: 'Max Mustermann'
          , age: 18
          , gender: 'Male'
          , born_at: Date()
        };

        request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send(data)
            .expect(201)
            .expect(/Max Mustermann/)
            .end(function(err, req) {
                console.log(req.body);
                done();
            });
    });
});

describe('GET /users/:id', function() {
    it('should return a error when user not found', function(done) {
        request(app)
            .get('/users/123')
            .expect(404)
            .expect(/user not found/, done);
    });

    it('should return a user when user exists', function(done) {
        var User = mongoose.model('User');
        var data = {
            name: 'Max Mustermann'
          , age: 18
          , gender: 'Male'
          , born_at: Date()
        };
        user = new User(data);
        user.save(function() {
            request(app)
                .get('/users/' + user._id)
                .expect(200)
                .end(function(err, req) {
                    console.log(req.body);
                    done();
                });
        });
    });
});

describe('GET /users', function() {
    it('should show all users', function (done) {
        request(app)
            .get('/users')
            .expect(/Max Mustermann/)
            .end(function(err, req) {
                console.log(req.body);
                done();
            });
    });
});

describe('DELETE /users/:id', function() {
    it('should show all users', function (done) {
        var User = mongoose.model('User');
        var data = {
            name: 'Judihuu'
          , age: 18
          , gender: 'Male'
          , born_at: Date()
        };
        user = new User(data);
        user.save(function() {
            request(app)
                .delete('/users/' + user._id)
                .expect(200)
                .expect(/deleted/)
                .end(function(err, req) {
                    console.log(req.body);
                    done();
                });
        });
    });
});


