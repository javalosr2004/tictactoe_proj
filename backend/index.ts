import express from "express";
import http from 'http';

const app = express();

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/:name', (req, res) => {
    res.send(`<h1>Hi ${req.params.name}</h1>`)
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});