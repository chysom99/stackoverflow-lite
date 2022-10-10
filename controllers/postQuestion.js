const models = require('../models/index');
const createQuestion = async (req, res) => {
    try {
        const { question_text } = req.body;
        if (!question_text || !question_text.trim())
            return res
                .status(400)
                .json({ messages: 'Question text is required' });
        const user_id = req.user_id;
        const question = await models.questions.create({
            question_text: question_text,
            user_id: user_id,
        });
        return res.json(question);
    } catch (err) {
        return res.status(500).json({ messages: err.message });
    }
};

module.exports = {
    createQuestion: createQuestion,
};
