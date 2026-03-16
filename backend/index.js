import express from 'express'
const app = express()
app.use(express.json())

app.get('/api/ping', (req, res) => {
    res.json({ok: true})
})

app.listen(3001, () => {
    console.log('Server running on port 3001')
})