const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/predict', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/predict.html'));
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening at port ${port}`)
})