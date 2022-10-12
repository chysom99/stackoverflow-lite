const models = require('../models/index');
const commentAnswer = async (req, res) => {
    try {
        // const commentId = parseInt(req.params.id);
        const { comment_text, answer_id } = req.body;
        const user_id = req.user_id;

        //check if the answer exists
        if (!answer_id) {
            return res.status(404).json({ messages: 'Answer id is required' });
        }
        const answer = await models.answers.findOne({
            where: {
                id: answer_id,
            },
        });

        if (answer) {
            const comment = await models.comments.create({
                comment_text: comment_text,
                // id: commentId,
                user_id: user_id,
                answer_id: answer_id,
            });
            return res.status(200).json(comment);
        } else {
            return res.status(404).json({ messages: 'Answer does not exist' });
        }
    } catch (err) {
        return res.status(500).json({ messages: err.message });
    }
};

module.exports = {
    commentAnswer: commentAnswer,
};
