process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = chai.expect;

const supertest = require('supertest');
const app = require('../index');

describe('Question Test', function () {
    describe('Positive Tests', function () {
        it('should successfully post a question', async function () {
            const response = await supertest(app)
                .post('/api/v1/question')

                .send({
                    question_text: 'My first age',
                    user_id: '24',
                })
                .set('Accept', 'application/json')
                .expect(200);

            const resp_data = response.body;
            console.log(resp_data);
            expect(resp_data).to.be.an('object');
            expect(resp_data).to.have.property('user');
            expect(resp_data.user.id).to.be.an('number');
        });
    });

    // describe('Question Test', function () {
    //     describe('Positive Tests', function () {
    //         it('should successfully post a question', async function () {
    //             const response = await supertest(app)
    //                 .post('/api/v1/question')

    //                 .send({
    //                     question_text: 'My first age',
    //                     user_id: '24',
    //                 })
    //                 .set('Accept', 'application/json')
    //                 .expect(200);

    //             const resp_data = response.body;
    //             console.log(resp_data);
    //             expect(resp_data).to.be.an('object');
    //             expect(resp_data).to.have.property('user');
    //             expect(resp_data.user.id).to.be.an('number');
    //         });
    //     });

    describe('Negative Tests', function () {
        it('should not post a question', async function () {
            const response = await supertest(app)
                .post('/api/v1/signup')
                .send({
                    question_text: 'My first age',
                    user_id: '24',
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
