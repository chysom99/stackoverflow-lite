const chai = require('chai');
const expect = chai.expect;

const supertest = require('supertest');
const app = require('../index');

describe('User Registration Test', function () {
    describe('Positive Tests', function () {
        it('should register user successfully', async function () {
            const response = await supertest(app)
                .post('/api/v1/signup')
                .send({
                    username: 'chisom',
                    firstname: 'lizzy',
                    lastname: 'john',
                    email: Date.now() + 'ofoeduc7@gmail.com',
                    password: 'ofoedu1',
                })
                .set('Accept', 'application/json')
                .expect(201);

            const resp_data = response.body;

            expect(resp_data).to.be.an('object');
            expect(resp_data).to.have.property('user');
            expect(resp_data.user.id).to.be.an('number');
        });
    });

    describe('Negative Tests', function () {
        it('should not register user successfully when an email is reuse', async function () {
            const response = await supertest(app)
                .post('/api/v1/signup')
                .send({
                    username: 'chisom',
                    firstname: 'lizzy',
                    lastname: 'john',
                    email: 'ofoeduc7@gmail.com',
                    password: 'ofoedu1',
                })
                .set('Accept', 'application/json')
                .expect(409);

            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data.message).to.be.an('string');
            expect(resp_data.message).to.contain('Email already taken');
        });
    });
});
