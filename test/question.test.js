process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = chai.expect;
const sample_data = require('./test.data.json');

const supertest = require('supertest');
const app = require('../index');

//positive test for post question
describe('Question Test', function () {
    describe('Positive Tests', function () {
        it('should successfully post a question', async function () {
            const response = await supertest(app)
                .post('/api/v1/question')
                .set({
                    Authorization: sample_data.auth_token,
                    Accept: 'application/json',
                })
                .send({
                    question_text: 'My first age',
                    user_id: '24',
                })
                .expect(200);
            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data).to.have.property('user_id');
            expect(resp_data.user_id).to.be.an('number');
        });
    });

    //positive test for delete question
    describe('Positive Tests', function () {
        it('should successfully delete a question', async function () {
            const response = await supertest(app)
                .delete('/api/v1/question/:id')
                .set({
                    Authorization: sample_data.auth_token,
                    Accept: 'application/json',
                })
                .send({
                    id: '32',
                })
                .expect(200);

            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data).to.have.property('message');
            expect(resp_data.message).to.contain(
                'successfully deleted a question'
            );
        });
    });

    //positive test for get question
    describe('Positive Tests', function () {
        it('should successfully get a question', async function () {
            const response = await supertest(app)
                .get('/api/v1/question')
                .set({
                    Authorization: sample_data.auth_token,
                    Accept: 'application/json',
                })
                .send({
                    user_id: '1',
                })
                .expect(200);

            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data).to.have.property('data');
            expect(resp_data.data).to.be.an('array');
        });
    });

    //negative test for post question
    describe('Negative Tests', function () {
        it('should not post a question', async function () {
            const response = await supertest(app)
                .post('/api/v1/question')
                .set({
                    Authorization: sample_data.auth_token,
                    Accept: 'application/json',
                })
                .send({
                    user_id: '24',
                })
                .expect(400);
            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data.messages).to.be.an('string');
            expect(resp_data.messages).to.contain('Question text is required');
        });
    });

    //negative test for delete question
    describe('Negative Tests', function () {
        it('should not delete a question', async function () {
            const response = await supertest(app)
                .delete('/api/v1/question/:id')
                .set({
                    Authorization: sample_data.auth_token,
                    Accept: 'application/json',
                })
                .send({
                    id: '900',
                })
                .expect(404);
            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data.message).to.be.an('string');
            expect(resp_data.message).to.contain('No question with such id');
        });
    });

    //negative test for get question
    describe('Negative Tests', function () {
        it('should not successfully get a question', async function () {
            const response = await supertest(app)
                .get('/api/v1/question')
                .set({
                    Authorization: sample_data.auth_token,
                    Accept: 'application/json',
                })
                .send({
                    user_id: '1',
                })
                .expect(200);

            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data).to.have.property('data');
            expect(resp_data.data).to.be.an('array');
        });
    });
});
