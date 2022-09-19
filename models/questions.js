

module.exports = (sequelize, Datatype) => {
    const Question = sequelize.define("questions", {
        user_id: {
            type: Datatype.INTEGER
        },
        question_text: {
            type: Datatype.TEXT
        }
    },
        {
            timestamps: true,
            paranoid: true,
            underscore: false,
            logging: false
        });


    return Question;
}
