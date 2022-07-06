const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());

app.post('/getData', async (req, res) => {
  try {
    const response = await axios.post('https://6km8a2kjn4.execute-api.us-east-1.amazonaws.com/InitialDeploy/vanaGolfData', req.body);
    const results = response;
    res.status(response.data.statusCode).send(response.data.body)
  } catch (e) {
    res.sendStatus(404)
  }
});

app.listen(port, ()=>{console.log('listening on 3000')})
