let teams = [
    {
      "id": 1,
      "location": "Buffalo",
      "mascot": "Bills",
      "abbreviation": "BUF",
      "conference": "AFC",
      "division": "East"
    },
    {
      "id": 2,
      "location": "Miami",
      "mascot": "Dolphins",
      "abbreviation": "MIA",
      "conference": "AFC",
      "division": "East"
    },
    {
      "id": 3,
      "location": "New England",
      "mascot": "Patriots",
      "abbreviation": "NE",
      "conference": "AFC",
      "division": "East"
    }]

    app.get('/heroes/:filter', (request, response) => {
      let result = heroes.filter( (hero) => {
          let filter = request.params.filter
          return hero.slug === filter || hero.realname === filter || hero.name === filter
      } )
      response.send(result)


var myContacts = [
  ['sasha', 'gemis'], 
  ['dawdu', 'mahama'],
  ['connor', 'gerrits'],
  ['sean', 'biller'] 
];

console.log(myContacts)

// string = "i am a string" 
// newArray = string.split("")

// console.log(newArray)



