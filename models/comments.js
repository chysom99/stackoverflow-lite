module.exports = (sequelize, Datatype) => {
    const Comment = sequelize.define("comments", {
        user_id: {
            type: Datatype.INTEGER
        },
        comment_text: {
            type: Datatype.TEXT
        },
        answer_id: {
            type: Datatype.INTEGER
        }
    
    });

    return Comment;

}