const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

let i = 0;
let date = new Date();
app.post('/', function (req, res) {
    for (let l of req.body.lines) {
        console.log(makeShortDate() + ' ' + l.replace(/^.*?\/src\//, ''));
    }
})

makeShortDate = () => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}