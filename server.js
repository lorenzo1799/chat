const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let posts = []; // Questo dovrebbe essere sostituito con un database

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const post = req.body;
    posts.push(post);
    res.status(201).json(post);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
