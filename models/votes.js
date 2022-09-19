module.exports = (sequelize, Datatype) => {
    const Vote = sequelize.define("votes", {
        user_id: {
            type: Datatype.INTEGER
        },
        answer_id: {
            type: Datatype.INTEGER
        },
        vote_type: {
            type: Datatype.ENUM("up","down")
        }
    
    });

    return Vote;

}