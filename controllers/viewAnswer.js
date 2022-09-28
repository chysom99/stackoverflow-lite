const models = require("../models/index");
const viewAnswer = async (req, res) => { 

    try {
        const question_id = parseInt(req.params.question_id);
        // const user_id = req.user_id;

        const answers = await models.answers.findAll({ where: { question_id: question_id } });

        return res.status(200).json({ success: 'true', message: answers })

    } catch (err) {
        return res.status(500).json({ success: 'false', message: 'An error occurred while processing your request' })
    }

};
module.exports = {
    "viewAnswer": viewAnswer
}
