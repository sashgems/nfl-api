module.exports = (sequelize, Sequelize) => {
    return sequelize.define('teams', {
        id: {
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true},
        location: { type: Sequelize.STRING, },
        mascot: { type: Sequelize.STRING, },
        abbreviation: { type: Sequelize.STRING, unique: true } ,
        conference: { 
            type: Sequelize.ENUM, 
            values: ['AFC', 'NFC'],},
        division: { 
            type: Sequelize.ENUM,
            values: ['North', 'East', 'South', 'West']},
    }
)}