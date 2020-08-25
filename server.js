require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const articles = require('./articles');
const mastheadInfo = require('./mastheadInfo');
const LatestArticles = require('./LatestArticles');
const TheLatestArticles = require('./TheLatestArticles');
const TopPosts = require('./TopPosts');
const LatestStories = require('./LatestStories');
 
app.use(cors());

app.post('/get-articles-by-category', bodyParser.json(), (req, res) => {
	let category = req.body.category;
	category = typeof category === "string" ? category.toLowerCase() : "";

	let result = articles.filter(item => item.category.toLowerCase() === category);

	res.json(result);
});

app.post('/get-article-by-id', bodyParser.json(), (req, res) => {
	let id = req.body.id;
	id = typeof id === "string" ? id.toLowerCase() : "";

	let result = articles.filter(item => item.id.toLowerCase() === id);

	res.json(result.length > 0 ? result[0] : undefined);
});

app.get('/get-masthead-info', bodyParser.json(), (req, res) => {
	res.json(mastheadInfo);
});

app.get('/get-the-latest-articles', bodyParser.json(), (req, res) => {
	res.json(TheLatestArticles);
});

app.get('/get-latest-articles', bodyParser.json(), (req, res) => {
	res.json(LatestArticles);
});

app.get('/get-top-posts', bodyParser.json(), (req, res) => {
	res.json(TopPosts);
});

app.get('/get-latest-stories', bodyParser.json(), (req, res) => {
	res.json(LatestStories);
});

app.post('/get-similar-articles', bodyParser.json(), (req, res) => {
	res.json(LatestStories);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
})