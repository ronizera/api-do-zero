import express from 'express'

const app = express()
app.use(express.json())

const users = []

app.post('/usuarios', (req, res) => {
    console.log(req)
    res.send('aqui deu cert')
})

app.get('/usuarios', (req, res) => {
    res.send("ok, deu bom")
})

app.listen(3000)
