const express = require('express')
const bodyParser = require('body-parser')
const Op = require('sequelize').Op
const models = require('./models')

const app = express()

// this required to tell express where static content can be delivered from
// such as css and js for the client
app.use('/client', express.static('client'))

// used for sendFile
app.use(express.static('client'))

// To extract the form data, we use the express.urlencoded() middleware
app.use(express.urlencoded())

app.get('/', (request, response) => {
  // this sendFile function works when we have used the static configuration first
  response.sendFile('./client/index.html')
})

app.post('/basic-info', (request, response) => {
  // use the servers console to show what came in
  console.log(request.body)
  // echo info back to the user
  response.send(`Got it. Thank you ${request.body.username}`)
})

app.get('/api/teams', async (request, response) => {
  const teams = await models.Teams.findAll()

  response.send(teams)
})

app.get('/api/teams/:identifier', async (request, response) => {
  const { identifier } = request.params
  const match = await models.Teams.findOne({
    where: { [Op.or]: [{ id: identifier }, { abbreviation: identifier }] }
  })

  if (match) {
    response.send(match)
  } else {
    response.sendStatus(404)
  }
})

app.post('/api/teams', bodyParser.json(), async (request, response) => {
  const {
    location, mascot, abbreviation, conference, division,
  } = request.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    response.status(400).send('The following fields are required: location, mascot, abbreviation, conference, division')
  }

  const newTeam = await models.Teams.create({ location, mascot, abbreviation, conference, division })

  response.status(201).send(newTeam)
})

app.listen(1337, () => { console.log('Listening on port 1337') })

module.exports = app
