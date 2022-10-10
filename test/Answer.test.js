process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = chai.expect;
const sample_data = require('./test.data.json');

const supertest = require('supertest');
const app = require('../index');

//positive test for post answer
describe('Answer Test', function () {
    describe('Positive Tests', function () {
        it('should successfully post an answer', async function () {
            const response = await supertest(app)
                .post('/api/v1/answer')
                .set({
                    Authorization: sample_data.auth_token,
                    Accept: 'application/json',
                })
                .send({
                    answer_text: 'grace',
                    user_id: '24',
                    question_id: '19',
                })
                .expect(200);
            const resp_data = response.body;
            expect(resp_data).to.be.an('object');
            expect(resp_data).to.have.property('user_id');
            expect(resp_data.user_id).to.be.an('number');
        });
    });

    //positive test for viewing answer
    //describe('Positive Tests', function () {
    it('should successfully view an answer', async function () {
        const response = await supertest(app)
            .get('/api/v1/answer/:question_id')
            .set({
                Authorization: sample_data.auth_token,
                Accept: 'application/json',
            })
            .send({
                question_id: '19',
            })
            .expect(200);
        const resp_data = response.body;
        expect(resp_data).to.be.an('object');
        expect(resp_data).to.have.property('data');
        expect(resp_data.data).to.be.an('array');
    });
    //});

    //positive test for commenting on an answer
    //describe('Positive Tests', function () {
    it('should successfully comment on an answer', async function () {
        const response = await supertest(app)
            .post('/api/v1/comment')
            .set({
                Authorization: sample_data.auth_token,
                Accept: 'application/json',
            })
            .send({
                comment_text: 'grace',
                user_id: '24',
                answer_id: '9',
            })
            .expect(200);
        const resp_data = response.body;
        expect(resp_data).to.be.an('object');
        expect(resp_data).to.have.property('user_id');
        expect(resp_data.user_id).to.be.an('number');
    });
    //});

    //negative test for post answer
    //describe('Negative Tests', function () {
    it('should not successfully post an answer', async function () {
        const response = await supertest(app)
            .post('/api/v1/answer')
            .set({
                Authorization: sample_data.auth_token,
                Accept: 'application/json',
            })
            .send({
                user_id: '24',
                question_id: '19',
            })
            .expect(400);

        const resp_data = response.body;
        expect(resp_data).to.be.an('object');
        expect(resp_data.messages).to.be.an('string');
        expect(resp_data.messages).to.contain('Answer text is required');
    });
    //});
    //negative for commenting on an answer
    //describe('Negative Tests', function () {
    it('should not successfully comment an answer', async function () {
        const response = await supertest(app)
            .post('/api/v1/comment')
            .set({
                Authorization: sample_data.auth_token,
                Accept: 'application/json',
            })
            .send({
                comment_text: 'grace',
                user_id: '24',
                //answer_id: '9',
            })
            .expect(404);

        const resp_data = response.body;
        expect(resp_data).to.be.an('object');
        expect(resp_data.messages).to.be.an('string');
        expect(resp_data.messages).to.contain('Answer does not exist');
    });
    //});
});
