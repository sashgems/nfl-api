const Players = sequelize.define('players', {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primarykey = true,
    },
    firstName: { type: Sequelize.STRING, },
    lastName: { type: Sequelize.STRING, },
    position: {type: Sequelize.STRING, },
    currentTeamId: {
        type: Sequelize.INTEGER, references: {model: Teams, key: 'id'}
    },

})

Players.belongsTo(Teams)
Teams.hasMany(Players)