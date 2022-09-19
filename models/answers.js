module.exports = (sequelize, Datatype) => {
    const Answer = sequelize.define("answers", {
        answer_text: {
            type: Datatype.TEXT
        },
        user_id: {
            type: Datatype.INTEGER
        },
        question_id: {
            type: Datatype.INTEGER
        },
        is_preferred: {
            type: Datatype.BOOLEAN
        }
    
    });

    return Answer;

}
