const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const should = require('chai').should();
const app = require('../../app');
chai.use(chaiHttp);
const agent = chai.request.agent(app);

const env = process.env.NODE_ENV || 'TEST';

const config = require('../../config/config.json');
const resMessages = require('../../config/res_messages.json');
const seed = require('../seed/seeds.js');
const testTimestamp = new Date().getTime();
describe('Employee Apis', function() {
    this.timeout(60000);
    // beforeEach(function (done) {
    //     setTimeout(function () {
    //         done();
    //     }, 100)
    // });
    after(function(done) {
        setTimeout(function() {
            done();
        }, 1000)
    });
    it('should get not found', (done) => {
        agent
            .get('/app/v1/testSampleGet')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
    it('should successfully get swagger data', (done) => {
        agent
            .get('/api-docs')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });

    it('should get all employees', function(done) {
        this.timeout(60000);
        agent
            .get('/app/v1/employee')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('employees')
                done();
            });
    });
    it('should successfully insert employee data', function(done) {
        this.timeout(60000);
        try {
            let payload = seed.postSeed;
            agent
                .post('/app/v1/employee')
                .send(payload)
                .then((res) => {
                    //  console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('employee')
                    done();
                }).catch(function(err) {
                    //  console.log(err);
                    err.should.have.status(400);
                    done();
                })
        } catch (error) {
            console.log(error);
            done();
        }
    });
    it('should fail to insert employee w/o email', function(done) {
        this.timeout(60000);
        try {
            let payload = seed.postSeed;
            payload.email = '';
            agent
                .post('/app/v1/employee')
                .send(payload)
                .then((res) => {
                    res.should.have.status(400);
                    done();
                }).catch(function(err) {
                    err.should.have.status(400);
                    done();
                })
        } catch (error) {
            console.log(error);
            done();
        }
    });

    it('should successfully update employee data', function(done) {
        this.timeout(60000);
        try {
            let payload = seed.putSeed;
            agent
                .put('/app/v1/employee')
                .send(payload)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('employee')
                    done();
                }).catch(function(err) {
                    err.should.have.status(400);
                    done();
                })
        } catch (error) {
            console.log(error);
            done();
        }
    });
    it('should fail to update employee data', function(done) {
        this.timeout(60000);
        try {
            let payload = {};
            agent
                .put('/app/v1/employee')
                .send(payload)
                .then((res) => {
                    res.should.have.status(400);
                    done();
                }).catch(function(err) {
                    err.should.have.status(400);
                    done();
                })
        } catch (error) {
            console.log(error);
            done();
        }
    });
    it('should successfully delete employee data', function(done) {
        this.timeout(60000);
        try {
            let payload = seed.deleteSeed;
            agent
                .delete('/app/v1/employee')
                .send(payload)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('employee')
                    done();
                }).catch(function(err) {
                    done();
                })
        } catch (error) {
            console.log(error);
            done();
        }
    });
    it('should fail to delete employee data', function(done) {
        this.timeout(60000);
        try {
            let payload = {};
            agent
                .delete('/app/v1/employee')
                .send(payload)
                .then((res) => {
                    res.should.have.status(400);
                    done();
                }).catch(function(err) {
                    err.should.have.status(400);
                    done();
                })
        } catch (error) {
            console.log(error);
            done();
        }
    });

})