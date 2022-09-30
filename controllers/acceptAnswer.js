const models = require('../models/index');
const acceptAnswer = async (req, res) => {
    try {
        const answer_id = parseInt(req.params.answer_id);
        const { is_preferred } = req.body;
        const answer = await models.answers.findOne({
            where: { id: answer_id },
        });

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
