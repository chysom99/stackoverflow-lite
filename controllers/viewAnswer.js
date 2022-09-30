const models = require('../models/index');
const viewAnswer = async (req, res) => {
    try {
        const question_id = parseInt(req.params.question_id);
        // const user_id = req.user_id;

        const answers = await models.answers.findAll({
            where: { question_id: question_id },
        });
        const user_id = req.user_id;
        const question = await models.questions.findOne({
            attributes: ['id'],
            where: { id: answer.question_id, user_id: user_id },
            raw: true,
        });

        if (!question) {
            return res
                .status(400)
                .json({
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

        return res.status(200).json({ success: 'true', data: answers });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while processing your request',
        });
    }
};
module.exports = {
    viewAnswer: viewAnswer,
};
