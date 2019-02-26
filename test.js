var assert = require('assert');
const request = require('supertest');
const app = require('./app');

describe('Test chats api', function(){
    it('Sto testando la lettura dei chat', function(done){
        request(app)
            .get('/chats')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 2);
                done(); 
            });
    });

    it('Sto aggiungendo chat', function(done){
        request(app)
            .post('/chats')
            .set('Accept', 'application/json')
            .send({
                name: 'Chat for Geek1',
            })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto aggiungendo una seconda chat', function(done){
        request(app)
            .post('/chats')
            .set('Accept', 'application/json')
            .send({
                name: 'Chat for Geek2',
            })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done(); 
            });
    })

    it('Sto testando la lettura delle Chat for Geek', function(done){
        request(app)
            .get('/chats?name=Geek')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 2);
                done(); 
            });
    });

    it('Sto aggiungenfo un messaggio', function(done){
        request(app)
            .post('/chats/1/messages')
            .set('Accept', 'application/json')
            .send({
                message: 'Hello Chat',
                author: 'me'
            })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.messages.length, 3);
                done(); 
            });
    });


    it('Sto eliminando un chat', function(done){
        request(app)
        .get('/chats/count')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            assert.equal(typeof res.body.count, 'number');
            var currentCount = res.body.count;
            request(app)
            .delete('/chats/0')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                request(app)
                .get('/chats/count')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    assert.equal(typeof res.body.count, 'number');
                    assert.equal(res.body.count, currentCount - 1);
                    done(); 
                });
            });
        });
        
    })
})