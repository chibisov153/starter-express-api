const express = require('express')
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server)

// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo!')
// })

app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', socket => {
	console.log('Connection', socket.id)
	socket.on('chat message', msg => {
		console.log('message: ' + msg)
		io.emit('chat message', msg)
	})
})

server.listen(process.env.PORT || 3000)
