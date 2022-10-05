const models = require('../models/index');
const voteAnswers = async (req, res) => {
    try {
        // const answer_id = parseInt(req.params.answer_id);
        const user_id = req.user_id;
        const { vote_type, answer_id } = req.body;
        const answer = await models.answers.findOne({
            where: {
                id: answer_id,
            },
        });

        if (answer) {
            const vote = await models.votes.create({
                vote_type: vote_type,
                user_id: user_id,
                answer_id: answer_id,
            });
            return res.status(200).json(vote);
        } else {
            return res.status(500).json({ messages: err.message });
        }
    } catch (err) {
        return res.status(500).json({ messages: err.message });
    }
};
module.exports = {
    voteAnswers: voteAnswers,
};
