
const chai = require('chai')
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const { send } = require('express/lib/response');

chai.use(chaiHttp);




describe('/First Test Collection', () => {
    it('test welcome route...', (done) => {

        chai.request(server)
        .get('/api/welcome')
        .end((err, res) => {
        
            res.should.have.status(200);
            res.body.should.be.a('object');
            const actualVal = res.body.message;
            expect(actualVal).to.be.equal('Welcome to the Men RESTful API');
            done();
        
        })

     
    })

    it('should verify that we have 0 sign in the DB', (done) => {
        chai.request(server)
        .get('/api/sign')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0)
            done();
        });
    });


    it('should post a valid sign', (done) => {

        let sign = {
            zodiac: "test",
            number: 1,
            traits: "test",
            element: "test",
            month: "test",
            inLuck: true
        }

        chai.request(server)
        .post('/api/sign')
        .send(sign)
        .end((err, res) => {
            res.should.have.status(200);

            done();
        });
    });

    it('should verify that we have 1 sign in the DB', (done) => {
        chai.request(server)
        .get('/api/sign')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1)
            done();
        });
    });


})

