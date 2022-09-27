const models = require("../models/index");
const createAnswer = async(req, res) => {
    try{
        const { answer_text } = req.body;
        const user_id = req.user_id;
        const question_id = req.question_id;
        const answer = await models.answers.create({
            "answer.text": answer_text,
            "user_id": user_id,
            "question_id": question_id
    });
    return res.json(answer);
    } catch (err) {
        return res.status(500).json({ messages: err.message })
    }
}

module.exports = {
    "createAnswer": createAnswer
}
