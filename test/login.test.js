process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = chai.expect;

const supertest = require('supertest');
const app = require('../index');

describe('User Login Test', function () {
    describe('Positive Tests', function () {
        it('should login user successfully', async function () {
            const response = await supertest(app)
                .post('/api/v1/login')
                .send({
                    email: 'ofoeduc7@gmail.com',
                    password: 'ofoedu1',
                })
                .set('Accept', 'application/json')
                .expect(201);

            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data.message).to.be.contain('Login successful');
            expect(resp_data).to.have.property('data');
            expect(resp_data.data.loginToken).to.be.an('string');
            expect(resp_data.data.loginToken).to.not.equal('');
        });
    });

    describe('Negative Tests', function () {
        it('should not login user successfully ', async function () {
            const response = await supertest(app)
                .post('/api/v1/login')
                .send({
                    email: 'ofoeduc7@gmail.com',
                    password: 'ofoed',
                })
                .set('Accept', 'application/json')
                .expect(401);

            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data.message).to.be.contain('Authentication failed');
        });
    });
});
