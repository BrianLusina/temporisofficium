// server.js
// where node app starts

// init project
let express = require('express');
let moment = require("moment");
let app = express();
let DATE_FORMAT = 'MMMM DD, YYYY';

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.get("/:date", (req, resp) => {
  let response = {
    "unix": null,
    "natural": null
  };

  let time = moment(req.params.date, DATE_FORMAT).isValid() 
  ? moment(req.params.date, DATE_FORMAT) : moment.unix(req.params.date);

  if(time.isValid()){
    response.unix = time.valueOf();
    response.natural = time.format(DATE_FORMAT);
  }

  res.send(JSON.stringify(response));
})

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});