const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const Op = require('sequelize').Op
const models = require('./models')
const NodeStl = require('node-stl')

const request = require('request');

const app = express()

// this required to tell express where static content can be delivered from
// such as css and js for the client
app.use('/client', express.static('client'))

// used for sendFile
app.use(express.static('client'))

// To extract the form data, we use the express.urlencoded() middleware
app.use(express.urlencoded())

// to handle a file upload and save it
// per https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
app.use(fileUpload())

app.get('/', (request, response) => {
  // this sendFile function works when we have used the static configuration first
  response.sendFile('./client/index.html')
})


const requestSettings = {
   method: 'GET',
   url: 'https://s3.amazonaws.com/minifactory-stl/WALLY_1plate.stl',
   encoding: null,
}

app.get('/stl-test', async (req, res) => {
  let stl = ''
  const result = await request(requestSettings, async function(error, response, body) {
    stl = new NodeStl(body)
    console.log({stl})
    return true
  })
  res.send(stl) 
})


app.post('/basic-info', (request, response) => {
  // use the servers console to show what files came in
  console.log(request.files)

  //__dirname is the current directory 
  console.log({__dirname})

  const uploadPath = `${__dirname}/_uploads`

  console.log({uploadPath})

  // @TODO: Make sure this save is working correctly
  let stlFilePath = `${uploadPath}/${request.files.stlfile.name}`
  request.files.stlfile.mv(stlFilePath, (error) => {
    if (error) {
      return response.status(500).send(error).end()
    }
  })

  // process the stl file raw content as uploaded
  let stlData = new NodeStl(request.files.stlfile.data, {density: 1.04})

  console.log(stlData.volume)

  // echo info back to the user
  response.send(stlData)
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
