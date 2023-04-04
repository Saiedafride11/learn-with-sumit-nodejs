const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
      console.log(req.body.name);
      res.send("This is home page post request")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})