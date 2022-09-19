
module.exports = (sequelize, Datatype) => {
    const User = sequelize.define("users", {
        username: {
            type: Datatype.STRING(50)
        },
        email: {
            type: Datatype.STRING(120),
            unique: true
        },
        firstname: {
            type: Datatype.STRING(120)
        },
        lastname: {
            type: Datatype.STRING(120)
        },
        password: {
            type: Datatype.STRING(512)
        }
    },
        {
            timestamps: true,
            paranoid: true,
            underscore: false,
            logging: false
        });


    return User;

}