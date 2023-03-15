const express = require('express')
require('babel-register')({
    presets: ['env']
});

const app = express()
const port = 3000

app.use(express.static('docs'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/index.html`)
})

//module.exports = require('./public/app.js')
