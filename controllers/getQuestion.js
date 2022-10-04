const models = require('../models/index');
const getQuestion = async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id);
        const questions = await models.questions.findAll({
            where: { user_id: userId },
        });
        return res.status(200).json({ success: 'true', data: questions });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while processing your request',
        });
    }
};
module.exports = {
    getQuestion: getQuestion,
};
