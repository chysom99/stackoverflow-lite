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
    it('should successfully view an answer', async function () {
        const response = await supertest(app)
            .get('/api/v1/answer/19')
            .set({
                Authorization: sample_data.auth_token,
                Accept: 'application/json',
            })

            .expect(200);
        const resp_data = response.body;
        expect(resp_data).to.be.an('object');
        expect(resp_data).to.have.property('data');
        expect(resp_data.data).to.be.an('array');
    });

    //positive test for commenting on an answer
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

    //positive test for voting on an answer
    it('should successfully vote on an answer', async function () {
        const response = await supertest(app)
            .put('/api/v1/vote')
            .set({
                Authorization: sample_data.auth_token,
                Accept: 'application/json',
            })
            .send({
                vote_type: 'down',
                answer_id: '9',
            })
            .expect(200);
        const resp_data = response.body;
        expect(resp_data).to.be.an('object');
        expect(resp_data).to.have.property('vote_type');
        expect(resp_data.vote_type).to.be.an('string');
    });

    //negative test for post answer
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

    it('should not successfully comment on answer when answer id is not passed', async function () {
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
        expect(resp_data.messages).to.contain('Answer id is required');
    });

    //negative test for commenting on an answer
    it('should not successfully comment on answer when answer does not exist', async function () {
        const response = await supertest(app)
            .post('/api/v1/comment')
            .set({
                Authorization: sample_data.auth_token,
                Accept: 'application/json',
            })
            .send({
                comment_text: 'grace',
                user_id: '24',
                answer_id: '-1',
            })
            .expect(404);
        const resp_data = response.body;
        expect(resp_data).to.be.an('object');
        expect(resp_data.messages).to.be.an('string');
        expect(resp_data.messages).to.contain('Answer does not exist');
    });

    //negative test for voting on an answer
    it('should not vote on an answer when answer id is not found', async function () {
        const response = await supertest(app)
            .put('/api/v1/vote')
            .set({
                Authorization: sample_data.auth_token,
                Accept: 'application/json',
            })
            .send({
                vote_type: 'down',
                answer_id: '-9',
            })
            .expect(404);
        const resp_data = response.body;
        expect(resp_data).to.be.an('object');
        expect(resp_data.message).to.be.an('string');
        expect(resp_data.message).to.contain('Answer was not found');
    });
});
