const models = require('../models/index');
const acceptAnswer = async (req, res) => {
    try {
        const answer_id = parseInt(req.params.answer_id);
        const { is_preferred } = req.body;
        const answer = await models.answers.findOne({
            where: { id: answer_id },
        });
        const user_id = req.user_id;
        const question = await models.questions.findOne({
            attributes: ['id'],
            where: { id: answer.question_id, user_id: user_id },
            raw: true,
        });

        if (!question) {
            return res.status(400).json({
                message: 'You are not permitted to accept this answer',
            });
        }
        const prevPreferredAnswer = await models.answers.findOne({
            where: { question_id: question.id, is_preferred: true },
        });
        if (prevPreferredAnswer) {
            prevPreferredAnswer.is_preferred = false;
            await prevPreferredAnswer.save();
        }
        answer.is_preferred = is_preferred;
        await answer.save();

        return res.json(answer);
    } catch (err) {
        return res.status(500).json({
            success: 'false',
            message: 'An error occurred while processing your request',
        });
    }
};
module.exports = {
    acceptAnswer: acceptAnswer,
};
