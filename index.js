const express = require('express')

const app = express()
//This creates an instance of an Express application

const models = require('./models') 

//This is instead of the './teams.json file, which would only show us
//results from that file whereas this requires the models folder which connects to our db

const bodyParser = require('body-parser')
//Middleware that takes a string and turns it into a JS object out of that string that we can then use

const Op = require('sequelize').Op 
//Operator that can be used to  make more complex comparisons



app.get('/teams', async (request, response,) => {
   const teams = await models.Teams.findAll()
    response.send(teams)
})
 
app.get('/teams/:filter/', async (request, response) => {
    //Short hand for const filter = request.params.filter
    const {filter} = request.params
    const match = await models.Teams.findAll({
        where: {  [Op.or]: [{location: filter},
                            {mascot: filter},
                            {abbreviation: filter},
                            {league: filter},
                            {division: filter}
                        
        ]}
    })
      if(match) {
        response.send(match)
    } else {
        response.status(404).send('Please provide a valud id, abbreviation, or division')
    }
    })
    
    
 app.post('/teams', bodyParser.json(), async (request, response) => {
        const body = request.body
    
        if (
           !body.location || 
           !body.mascot || 
           !body.abbreviation || 
           !body.league|| 
           !body.division
        ) {
          response.status(400).send('The following attributes are required: location, mascot, abbreviation, league and division.')
        }
    
        const newTeam = await models.Teams.create( body )
    
        response.status(201).send(newTeam);
    })
 

app.all('*', (request, response) => {
    console.log({request})
    response.send('you are a unicorn and are on the right track, keep going!')
})

app.listen(1338, () => {
    console.log('We are listening')
})