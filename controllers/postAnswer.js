const models = require('../models/index');
const createAnswer = async (req, res) => {
    try {
        const { answer_text, question_id } = req.body;
        if (!answer_text || !answer_text.trim())
            return res
                .status(400)
                .json({ messages: 'Answer text is required' });
        const user_id = req.user_id;
        const answer = await models.answers.create({
            answer_text: answer_text,
            user_id: user_id,
            question_id: question_id,
        });
        return res.json(answer);
    } catch (err) {
        return res.status(500).json({ messages: err.message });
    }
};

module.exports = {
    createAnswer: createAnswer,
};
