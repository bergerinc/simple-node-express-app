const express = require('express');
const morgan = require('morgan');
const TestData = require('./src/test-data');
const app = express();

//app.use(morgan('dev')); //uncomment for console logging


app.get('/api/users/:name?', (req, res) => {

  let result;

  //check for name parameter - return entire list if it does not exist
  if(! req.params.name) {
    result = { names: TestData.names }; //return name list
  } else {
    result = { name: ''}; //return selected name
    result.name = TestData.names.find(n => n.toLowerCase() === req.params.name.toLowerCase());
  }
  
  //respond with json
  res.status(200).json(result);
});


//default app route
app.get('/', (req, res) => {
  res.status(200).sendFile(`${__dirname}/public/index.html`);
});


//listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application listening on port: ${port}`);
});