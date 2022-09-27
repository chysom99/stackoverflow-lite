const models = require("../models/index");
const deleteQuestion = async (req, res) => {

    try {
        const questionId = parseInt(req.params.id);
        const userId = req.user_id;

        const count = await models.questions.destroy({
            where: { id: questionId, user_id: userId }
        });

        return res.status(200).json({ success: 'true', message: 'successfully deleted a question' })

    } catch (err) {
        return res.status(401).json({ success: 'false', message: 'unauthorized to delete this question' })
    }
};
module.exports = {
    "deleteQuestion": deleteQuestion
}
