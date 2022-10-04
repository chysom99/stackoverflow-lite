const models = require('../models/index');
const getQuestions = async (req, res) => {
    try {
        const userId = parseInt(req.query.user_id);
        const whereClause = {};
        if (userId) whereClause.user_id = userId;
        const questions = await models.questions.findAll({
            raw: true,
            where: whereClause,
        });
        return res.status(200).json({ success: 'true', data: questions });
    } catch (err) {
        return res.status(500).json({
            message: 'An error occurred while processing your request',
        });
    }
};
module.exports = {
    getQuestions: getQuestions,
};
