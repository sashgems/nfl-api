const Sequelize = require('sequelize')
const allConfigs = require('../config/sequelize')
const TeamsModel = require('./teams') 
//You are in the models folder so you don't have to require './models/teams just './teams' 
//and then in your main index.js folder you require the whole models folder

const config = allConfigs['development']

const connection = new Sequelize(config.database, config.username, config.password,{
    host: config.host,
    dialect: config.dialect,
})
console.log({config})

const Teams = TeamsModel(connection, Sequelize)

module.exports = {
    Teams,
}

