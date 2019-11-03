const express = require('express')
var app = express()
var teams = require('./teams.json')


app.get('/teams',(request,response) => {
    response.send(teams)
})
    
app.get('/teams/:id/', (request, response) => {
    let teamById = teams.filter( (item) => {
        return item.id == request.params.id
        
    })
    response.send(teamById)

})

app.get('/teams/:id/:abbreviation/', (request, response) => {
    let teamByAbbreviation = teams.filter( (team) => {
       return team.abbreviation == request.params.abbreviation
    })  
    
    response.send(teamByAbbreviation)
    
}) 

app.all('*', (request, response) => {
    console.log({request})
    response.send('you are a unicorn and are on the right track, keep going!')
})

app.listen(1338, () => {
    console.log('We are listening')
})

// const port = process.env.PORT || 3000; 
// app.listen(port, () => {
//     console.log(`Listtening on ${port}...`)
// })

module.exports = app